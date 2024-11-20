import { NextResponse } from 'next/server';
import { JobPosting } from '@/types/jobPosting';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id: params.id },
    });
    if (!jobPosting) {
      return NextResponse.json({ error: 'Job posting not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...jobPosting,
      requirements: jobPosting.requirements ? jobPosting.requirements.split(',') : []
    });
  } catch (error) {
    console.error('Failed to fetch job posting:', error);
    return NextResponse.json({ error: 'Failed to fetch job posting' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data: JobPosting = await request.json();
    const updatedJobPosting = await prisma.jobPosting.update({
      where: { id: params.id },
      data: {
        title: data.title,
        department: data.department,
        location: data.location,
        description: data.description,
        requirements: data.requirements ? data.requirements.join(',') : null,
      },
    });
    return NextResponse.json(updatedJobPosting);
  } catch (error) {
    console.error('Failed to update job posting:', error);
    return NextResponse.json({ error: 'Failed to update job posting' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.jobPosting.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error('Failed to delete job posting:', error);
    return NextResponse.json({ error: 'Failed to delete job posting' }, { status: 500 });
  }
}
