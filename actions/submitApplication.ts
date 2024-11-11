"use server";

import { z } from "zod";
import type { ActionResponse, ValidationErrors } from "@/types/action";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import { refreshDropboxToken } from "@/utils/dropboxAuth/route"; // Ensure this utility function is correctly imported
import {
  getApplicationConfirmationEmail,
  getBaseEmailTemplate,
} from "@/lib/email-templates";
import { auth } from "@clerk/nextjs/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const submitApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().nullable(),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  resume: z.any(),
  hearAbout: z.string().min(1, "How you heard about us is required"),
  otherSource: z.string().optional().nullable(),
  experience: z.string().min(1, "Experience level is required"),
  salary: z.string().min(1, "Salary expectation is required"),
});

export async function submitApplication(
  formData: FormData
): Promise<ActionResponse> {
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

    let resumeUrl = "";
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("Dropbox access token is not defined.");
    }

    if (resumeFile && resumeFile.size <= MAX_FILE_SIZE) {
      const dbx = createDropboxInstance(accessToken);
      const buffer = await resumeFile.arrayBuffer();

      try {
        const uploadResponse = await dbx.filesUpload({
          path: `/resumes/${parsedData.name.replace(
            /\s+/g,
            "_"
          )}_${Date.now()}.pdf`,
          contents: buffer,
          mode: { ".tag": "add" },
          autorename: true,
          mute: false,
        });

        const path = uploadResponse.result.path_lower;
        if (!path) {
          throw new Error("Upload path is undefined");
        }
        const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
          path,
        });
        if (linkResponse.result.url) {
          resumeUrl = linkResponse.result.url.replace("?dl=0", "?dl=1"); // Direct download link
        } else {
          throw new Error("Failed to create shared link: URL is undefined");
        }
      } catch (uploadError) {
        const error = uploadError as { status?: number; message?: string };

        if (error.status === 401) {
          const newAccessToken = await refreshDropboxToken();
          if (newAccessToken) {
            const dbx = createDropboxInstance(newAccessToken);
            const buffer = await resumeFile.arrayBuffer();

            const uploadResponse = await dbx.filesUpload({
              path: `/resumes/${parsedData.name.replace(
                /\s+/g,
                "_"
              )}_${Date.now()}.pdf`,
              contents: buffer,
              mode: { ".tag": "add" },
              autorename: true,
              mute: false,
            });

            const path = uploadResponse.result.path_lower;
            if (!path) {
              throw new Error("Upload path is undefined");
            }
            const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
              path,
            });
            if (linkResponse.result.url) {
              resumeUrl = linkResponse.result.url.replace("?dl=0", "?dl=1"); // Direct download link
            } else {
              throw new Error("Failed to create shared link: URL is undefined");
            }
          } else {
            throw new Error("Failed to refresh Dropbox token.");
          }
        } else {
          console.error("Dropbox upload error:", error.message);
          throw new Error("Failed to upload resume. Please try again.");
        }
      }
    }

    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized - Please sign in to submit an application");
    }

    // First, find or create the user
    const user = await prisma.user.upsert({
      where: {
        clerkId: userId,
      },
      update: {
        name: parsedData.name,
        email: parsedData.email,
        phoneNumber: parsedData.phoneNumber || null,
      },
      create: {
        clerkId: userId,
        name: parsedData.name,
        email: parsedData.email,
        phoneNumber: parsedData.phoneNumber || null,
      },
    });

    // Then create the application
    const application = await prisma.application.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phoneNumber: parsedData.phoneNumber || null,
        position: parsedData.position,
        location: parsedData.location,
        resumeUrl,
        hearAbout: parsedData.hearAbout,
        otherSource: parsedData.otherSource || null,
        experience: parsedData.experience,
        salary: parsedData.salary,
        status: "New",
        appliedDate: new Date(),
        userId: user.id, // Connect to the user we just found/created
      },
    });

    await Promise.all([
      sendEmail({
        to: parsedData.email,
        subject: "Application Received - BQI Tech",
        body: getApplicationConfirmationEmail(
          parsedData.name,
          parsedData.position
        ),
      }),
      sendEmail({
        to: process.env.HR_EMAIL || "",
        subject: "New Application Received - BQI Tech",
        body: getBaseEmailTemplate({
          recipientName: "HR Team",
          content: `
            <p>A new application has been received for the ${
              parsedData.position
            } position.</p>
            <p><strong>Applicant Details:</strong></p>
            <ul style="padding-left: 20px; margin: 16px 0;">
              <li>Name: ${parsedData.name}</li>
              <li>Email: ${parsedData.email}</li>
              <li>Phone: ${parsedData.phoneNumber || "Not provided"}</li>
              <li>Location: ${parsedData.location}</li>
              <li>Experience Level: ${parsedData.experience}</li>
              <li>Source: ${parsedData.hearAbout}${
            parsedData.otherSource ? ` - ${parsedData.otherSource}` : ""
          }</li>
              <li>Expected Salary: ${parsedData.salary}</li>
            </ul>
            ${
              resumeUrl
                ? `<p>Resume: <a href="${resumeUrl}" style="color: #2563eb;">Download Resume</a></p>`
                : ""
            }
          `,
          ctaLink: `${process.env.NEXT_PUBLIC_APP_URL}/admin/applications/${application.id}`,
          ctaText: "View Application",
        }),
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
// Function to create a new Dropbox instance
const createDropboxInstance = (accessToken: string) => {
  return new Dropbox({
    accessToken,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    fetch: fetch, // Provide the fetch implementation
  });
};
