import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      totalApplications,
      shortlisted,
      technicalAssessment,
      interviewing,
      hired,
      disqualified
    ] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { shortlistedDate: { not: null } } }),
      prisma.application.count({ where: { assessmentDate: { not: null } } }),
      prisma.application.count({ where: { interviewDate: { not: null }, hireDate: null, disqualifiedDate: null } }),
      prisma.application.count({ where: { hireDate: { not: null } } }),
      prisma.application.count({ where: { disqualifiedDate: { not: null } } })
    ]);

    return NextResponse.json({
      totalApplications,
      shortlisted,
      technicalAssessment,
      interviewing,
      hired,
      disqualified
    });
  } catch (error) {
    console.error('Error fetching overview data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
  
}
