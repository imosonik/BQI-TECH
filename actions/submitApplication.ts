"use server";

import { z } from "zod";
import type { ActionResponse, ValidationErrors } from "@/types/action";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import { refreshDropboxToken } from '@/utils/dropboxAuth/route'; // Ensure this utility function is correctly imported

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const submitApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().nullable(),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  resume: z.any(),
  hearAbout: z.enum(["LinkedIn", "Internet search", "Other"]),
  otherSource: z.string().optional().nullable(),
  experience: z.enum(["Entry Level", "Mid Level", "Senior"]),
  salary: z.string().min(1, "Salary expectation is required"),
});

// Function to create a new Dropbox instance
const createDropboxInstance = (accessToken: string) => {
  return new Dropbox({
    accessToken,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    fetch: fetch // Provide the fetch implementation
  });
};

export async function submitApplication(formData: FormData): Promise<ActionResponse> {
  try {
    const resumeFile = formData.get("resume") as File | null;

    const parsedData = submitApplicationSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      position: formData.get("position"),
      location: formData.get("location"),
      resume: resumeFile,
      hearAbout: formData.get("hearAbout"),
      otherSource: formData.get("otherSource"),
      experience: formData.get("experience"),
      salary: formData.get("salary"),
    });

    let resume = "";
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN; // Get the access token

    // Check if accessToken is defined
    if (!accessToken) {
      throw new Error("Dropbox access token is not defined.");
    }

    if (resumeFile && resumeFile instanceof File) {
      if (resumeFile.type !== "application/pdf") {
        throw new Error("Please upload a PDF file.");
      }
      try {
        const buffer = await resumeFile.arrayBuffer();
        const dbx = createDropboxInstance(accessToken); // Now this should work

        const uploadResponse = await dbx.filesUpload({
          path: `/resumes/${parsedData.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`,
          contents: buffer,
          mode: { '.tag': 'add' },
          autorename: true,
          mute: false
        });

        const path = uploadResponse.result.path_lower;
        if (!path) {
          throw new Error("Failed to get the file path from Dropbox.");
        }

        const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
          path: path
        });

        resume = linkResponse.result.url.replace('?dl=0', '?dl=1'); // Direct download link
      } catch (uploadError) {
        const error = uploadError as { status?: number; message?: string }; // Type assertion

        if (error.status === 401) {
          const newAccessToken = await refreshDropboxToken(); // Refresh the Dropbox token
          if (newAccessToken) {
            const dbx = createDropboxInstance(newAccessToken);
            // Retry the upload with the new access token
            const buffer = await resumeFile.arrayBuffer();
            const uploadResponse = await dbx.filesUpload({
              path: `/resumes/${parsedData.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`,
              contents: buffer,
              mode: { '.tag': 'add' },
              autorename: true,
              mute: false
            });

            const path = uploadResponse.result.path_lower;
            if (!path) {
              throw new Error("Failed to get the file path from Dropbox.");
            }

            const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
              path: path
            });

            resume = linkResponse.result.url.replace('?dl=0', '?dl=1'); // Direct download link
          } else {
            throw new Error("Failed to refresh Dropbox token.");
          }
        } else {
          console.error("Dropbox upload error:", error.message);
          throw new Error("Failed to upload resume. Please try again.");
        }
      }
    }

    const application = await prisma.application.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phoneNumber: parsedData.phoneNumber || null,
        position: parsedData.position,
        location: parsedData.location,
        resumeUrl: resume,
        hearAbout: parsedData.hearAbout,
        otherSource: parsedData.otherSource || null,
        experience: parsedData.experience,
        salary: parsedData.salary,
        status: "New",
        appliedDate: new Date(),
      },
    });

    await Promise.all([
      sendEmail({
        to: parsedData.email,
        subject: "Application Received",
        body: `Thank you for your application for the ${parsedData.position} position.`,
      }),
      sendEmail({
        to: process.env.HR_EMAIL || "hr@company.com",
        subject: "New Application Received",
        body: `A new application for ${parsedData.position} has been received from ${parsedData.name}.`,
      }),
    ]).catch((emailError) => {
      console.error("Email sending error:", emailError);
    });

    return {
      success: true,
      message: "Application submitted successfully",
      data: { applicationId: application.id },
    };
  } catch (error) {
    console.error("Application submission error:", error);

    if (error instanceof z.ZodError) {
      const validationErrors: ValidationErrors = error.errors.reduce(
        (acc, curr) => {
          const key = curr.path.join(".");
          acc[key] = acc[key] ? [...acc[key], curr.message] : [curr.message];
          return acc;
        },
        {} as ValidationErrors
      );

      return {
        success: false,
        message: "Validation error",
        error: validationErrors,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        error: { general: [error.message] },
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
      error: { general: ["Unknown error"] },
    };
  }
}
