import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: {
        appliedDate: 'desc'
      },
      select: {
        id: true,
        name: true,
        position: true,
        status: true,
        appliedDate: true
      }
    })

    return NextResponse.json(recentApplications)
  } catch (error) {
    console.error('Error fetching recent applications:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 