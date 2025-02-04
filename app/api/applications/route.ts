import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user?.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const applications = await prisma.application.findMany({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        position: true,
        status: true,
        appliedDate: true,
        resumeUrl: true,
      },
      orderBy: {
        appliedDate: "desc",
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
