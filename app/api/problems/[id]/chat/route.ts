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
    const conversation = await prisma.conversation.findFirst({
      where: {
        problemId: problemId,
        OR: [{ studentId: session.user.id }, { mentorId: session.user.id }],
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json([]);
    }

    return NextResponse.json(conversation.messages);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}

export async function POST(
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

  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        problemId: problemId,
        OR: [{ studentId: session.user.id }, { mentorId: session.user.id }],
      },
    });

    if (!conversation) {
      const problem = await prisma.problem.findUnique({
        where: { id: problemId },
      });

      if (!problem || !problem.mentorId) {
        return NextResponse.json(
          { error: "Problem or mentor not found" },
          { status: 404 }
        );
      }

      conversation = await prisma.conversation.create({
        data: {
          problemId: problemId,
          studentId: problem.userId,
          mentorId: problem.mentorId,
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        conversationId: conversation.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
