import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, position, resume } = body;

    const newApplication = await prisma.application.create({
      data: {
        name,
        email,
        position,
        resume,
        status: 'New',
        appliedDate: new Date(),
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
