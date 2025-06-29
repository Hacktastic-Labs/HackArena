import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: id },
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error);
    return NextResponse.json(
      { error: "Failed to fetch problem" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id: problemId } = await params;
  const body = await req.json();
  const { title, description, tags, status } = body;

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    let updatedProblem;

    if (status) {
      if (problem.mentorId !== session.user.id) {
        return NextResponse.json(
          { error: "Only the assigned mentor can change the status" },
          { status: 403 }
        );
      }
      updatedProblem = await prisma.problem.update({
        where: { id: problemId },
        data: { status },
      });
    } else {
      if (problem.userId !== session.user.id) {
        return NextResponse.json(
          { error: "Only the author can edit the problem" },
          { status: 403 }
        );
      }
      updatedProblem = await prisma.problem.update({
        where: { id: problemId },
        data: {
          title: title || problem.title,
          description: description || problem.description,
          tags: tags || problem.tags,
        },
      });
    }

    return NextResponse.json(updatedProblem);
  } catch (error) {
    console.error("Error updating problem:", error);
    return NextResponse.json(
      { error: "Failed to update problem" },
      { status: 500 }
    );
  }
}
