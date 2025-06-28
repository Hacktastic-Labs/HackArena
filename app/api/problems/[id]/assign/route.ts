import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// PATCH /api/problems/[id]/assign - Assign mentor to a problem
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a mentor
    if ((session.user as any)?.role !== "MENTOR") {
      return NextResponse.json({ error: "Access denied. Mentor role required." }, { status: 403 });
    }

    const problemId = params.id;

    // Check if problem exists and is not already assigned
    const existingProblem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        user: {
          select: { id: true, name: true, image: true, email: true }
        },
        mentor: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    if (!existingProblem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    if (existingProblem.mentorId && existingProblem.mentorId !== session.user.id) {
      return NextResponse.json({ error: "Problem is already assigned to another mentor" }, { status: 400 });
    }

    // Assign mentor to problem and update status
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        mentorId: session.user.id,
        status: 'IN_PROGRESS'
      },
      include: {
        user: {
          select: { id: true, name: true, image: true, email: true }
        },
        mentor: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    return NextResponse.json({ problem: updatedProblem });
  } catch (error) {
    console.error('Error assigning mentor to problem:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 