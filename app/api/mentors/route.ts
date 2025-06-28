import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(_request: NextRequest) {
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
