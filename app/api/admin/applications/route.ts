import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const applications = await prisma.application.findMany({
      where: status ? { status } : {},
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        position: true,
        appliedDate: true,
        status: true,
        shortlistedDate: true,
        resumeUrl: true,
        cotsExperience: true,
        sqlJavaScriptExperience: true,
        reportDevelopmentExperience: true,
        hearAbout: true,
        otherSource: true,
        experience: true,
        salary: true
      },
      
    });
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
