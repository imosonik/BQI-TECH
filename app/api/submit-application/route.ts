import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

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
  phoneNumber: z.string().nullable(),
  otherSource: z.string().nullable()
});

type ApplicationData = z.infer<typeof applicationSchema>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    const application = await prisma.application.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        position: validatedData.position,
        location: validatedData.location,
        resumeUrl: validatedData.resumeUrl,
        hearAbout: validatedData.hearAbout,
        otherSource: validatedData.otherSource,
        experience: validatedData.experience,
        salary: validatedData.salary,
        status: validatedData.status,
        appliedDate: validatedData.appliedDate,
        lastUpdated: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      application 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
