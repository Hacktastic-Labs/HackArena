import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  console.log("Fetching mentors from /api/mentors...");
  try {
    const mentors = await prisma.user.findMany({
      where: {
        role: "MENTOR",
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
