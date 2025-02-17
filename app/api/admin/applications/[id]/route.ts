import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/email';
import { getStatusChangeEmail } from '@/lib/email-templates';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: params.id },
    });
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    // Get the current application to check for status change
    const currentApplication = await prisma.application.findUnique({
      where: { id: params.id },
      select: {
        status: true,
        name: true,
        email: true,
        position: true
      }
    });

    if (!currentApplication) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update the application
    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: {
        ...body,
        shortlistedDate: body.status === 'Shortlisted' ? new Date() : undefined,
        assessmentDate: body.status === 'Technical Assessment' ? new Date() : undefined,
        interviewDate: body.status === 'Interviewing' ? new Date() : undefined,
        hireDate: body.status === 'Hired' ? new Date() : undefined,
        disqualifiedDate: body.status === 'Disqualified' ? new Date() : undefined,
      },
    });

    // Send email notification if status has changed
    if (body.status !== currentApplication.status) {
      await sendEmail({
        to: currentApplication.email,
        subject: `Application Status Update - ${body.status}`,
        body: getStatusChangeEmail(
          currentApplication.name,
          currentApplication.position,
          body.status
        ),
      }).catch((error) => {
        console.error('Error sending status change email:', error);
        // Don't throw error to prevent blocking the status update
      });

      // Create notification in the database
      await prisma.notification.create({
        data: {
          title: 'Application Status Updated',
          message: `${currentApplication.name}'s application status changed to ${body.status}`,
          type: 'info',
          date: new Date(),
        },
      });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.application.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
