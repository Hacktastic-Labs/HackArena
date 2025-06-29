import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: problemId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      select: { tags: true, mentorId: true },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const problemTags = problem.tags;

    if (problemTags.length === 0) {
      return NextResponse.json([]);
    }

    const mentors = await prisma.user.findMany({
      where: {
        role: "MENTOR",
        id: { not: problem.mentorId || undefined }, // Exclude already assigned mentor
        skills: {
          hasSome: problemTags,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        skills: true,
      },
      take: 5, // Limit to 5 suggestions
    });

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching matching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch matching mentors" },
      { status: 500 }
    );
  }
}
