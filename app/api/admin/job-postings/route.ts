import { NextResponse } from "next/server";
import { JobPosting } from "@/types/jobPosting";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobPostings = await prisma.jobPosting.findMany();
    return NextResponse.json(jobPostings);
  } catch (error) {
    console.error("Failed to fetch job postings:", error);
    return NextResponse.json(
      { error: "Failed to fetch job postings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: Omit<JobPosting, "id" | "postedDate"> = await request.json();
    const newJobPosting = await prisma.jobPosting.create({
      data: {
        ...data,
        postedDate: new Date(),
      },
    });
    return NextResponse.json(newJobPosting, { status: 201 });
  } catch (error) {
    console.error("Failed to create job posting:", error);
    return NextResponse.json(
      { error: "Failed to create job posting" },
      { status: 500 }
    );
  }
}
