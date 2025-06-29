import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET(_request: NextRequest) {
  console.log("Fetching mentors from /api/mentors...");
  try {
    const mentors = await prisma.user.findMany({
      where: {
        role: "MENTOR",
      },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        name: true,
        username: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        skills: true,
      },
    });
    console.log("Mentors found in database:", mentors);
    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skills } = await request.json();

    if (!Array.isArray(skills)) {
      return NextResponse.json({ error: "Skills must be an array" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { skills },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 