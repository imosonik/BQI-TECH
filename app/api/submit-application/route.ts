import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

const applicationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  resumeUrl: z.string().url(),
  status: z.string(),
  appliedDate: z.date(),
  location: z.string(),
  hearAbout: z.string(),
  experience: z.string(),
  salary: z.string(),
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    // First find or create user
    const user = await prisma.user.upsert({
      where: {
        clerkId: userId,
      },
      update: {
        name: validatedData.name,
        email: validatedData.email,
        phoneNumber: null,
      },
      create: {
        clerkId: userId,
        name: validatedData.name,
        email: validatedData.email,
        phoneNumber: null,
      },
    });

    // Then create application
    const newApplication = await prisma.application.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, application: newApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
