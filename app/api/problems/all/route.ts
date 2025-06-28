import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// GET /api/problems/all - Fetch all problems for mentors
export async function GET(request: NextRequest) {
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

    const problems = await prisma.problem.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true
          }
        },
        mentor: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get stats for mentor dashboard
    const stats = {
      totalProblems: problems.length,
      openProblems: problems.filter(p => p.status === 'OPEN').length,
      inProgressProblems: problems.filter(p => p.status === 'IN_PROGRESS').length,
      resolvedProblems: problems.filter(p => p.status === 'RESOLVED').length,
      myMentoredProblems: problems.filter(p => p.mentorId === session.user.id).length,
      uniqueStudents: new Set(problems.map(p => p.userId)).size
    };

    return NextResponse.json({ problems, stats });
  } catch (error) {
    console.error('Error fetching all problems:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 