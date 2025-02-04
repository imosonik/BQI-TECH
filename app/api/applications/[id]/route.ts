import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user?.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const userEmail = user.emailAddresses[0].emailAddress

    const application = await prisma.application.findFirst({
      where: {
        AND: [
          { id: params.id },
          { email: userEmail }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        position: true,
        status: true,
        appliedDate: true,
        resumeUrl: true
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(application)

  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 