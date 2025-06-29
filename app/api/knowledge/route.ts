import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { analyzeWithGemini } from "@/app/lib/gemini";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, source, sourceType } = await req.json();

  if (!title || !source || !sourceType) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const knowledgeBaseItem = await prisma.knowledgeBase.create({
      data: {
        userId: session.user.id,
        title,
        source,
        sourceType,
        status: "PENDING",
      },
    });

    // Fire-and-forget Gemini analysis
    analyzeWithGemini(knowledgeBaseItem).catch((error) => {
      console.error(
        `[Background Job] Failed to analyze knowledge base item ${knowledgeBaseItem.id}:`,
        error
      );
    });

    return NextResponse.json(knowledgeBaseItem, { status: 201 });
  } catch (error) {
    console.error("Error creating knowledge base item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const knowledgeItems = await prisma.knowledgeBase.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(knowledgeItems);
  } catch (error) {
    console.error("Error fetching knowledge items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
