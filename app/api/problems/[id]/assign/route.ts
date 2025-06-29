import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// PATCH /api/problems/[id]/assign - Assign mentor to a problem
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const problemId = context.params.id;
    let assignedMentorId: string | undefined;

    // Try to parse body to see if a student is assigning a specific mentor
    const bodyText = await request.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const studentAssignedMentorId = body.mentorId;

    if (studentAssignedMentorId) {
      // Case 1: Student is assigning a specific mentor from the chat page
      const problem = await prisma.problem.findUnique({ where: { id: problemId } });
      if (!problem) {
        return NextResponse.json({ error: "Problem not found" }, { status: 404 });
      }
      if (problem.userId !== session.user.id) {
        return NextResponse.json({ error: "Only the author can assign a mentor" }, { status: 403 });
      }
      const mentor = await prisma.user.findFirst({ where: { id: studentAssignedMentorId, role: 'MENTOR' } });
      if (!mentor) {
        return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
      }
      assignedMentorId = studentAssignedMentorId;

    } else {
      // Case 2: Mentor is assigning themselves from the dashboard
      if ((session.user as any)?.role !== "MENTOR") {
        return NextResponse.json({ error: "Only mentors can take this action" }, { status: 403 });
      }
      const problem = await prisma.problem.findUnique({ where: { id: problemId } });
      if (!problem) {
        return NextResponse.json({ error: "Problem not found" }, { status: 404 });
      }
      if (problem.status !== 'OPEN') {
        return NextResponse.json({ error: "Problem is not open for assignment" }, { status: 400 });
      }
      assignedMentorId = session.user.id;
    }

    if (!assignedMentorId) {
        return NextResponse.json({ error: "Could not determine mentor for assignment" }, { status: 400 });
    }

    // Assign the mentor and update the problem status
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        mentorId: assignedMentorId,
        status: "IN_PROGRESS",
      },
      include: {
        mentor: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json({ problem: updatedProblem });
  } catch (error) {
    console.error("Error assigning mentor to problem:", error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 