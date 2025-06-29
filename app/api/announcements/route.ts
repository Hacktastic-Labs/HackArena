import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@/app/lib/auth";
import { z } from "zod";

const prisma = new PrismaClient();

const createAnnouncementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.enum(["GENERAL", "EVENTS", "TECHNEWS"]).optional(),
  eventId: z.string().cuid().optional(),
  url: z.string().url().optional(),
  source: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") as
      | "GENERAL"
      | "EVENTS"
      | "TECHNEWS"
      | null;

    const where = category ? { category } : {};

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: { id: true, name: true, username: true, image: true },
        },
        event: true,
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role?: string })?.role;
    if (userRole !== "MENTOR" && userRole !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const result = createAnnouncementSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      title,
      description,
      category = "GENERAL",
      eventId,
      url,
      source,
    } = result.data;

    const ann = await prisma.announcement.create({
      data: {
        title,
        description,
        category,
        createdById: session.user.id,
        ...(eventId ? { eventId } : {}),
        ...(url ? { url } : {}),
        ...(source ? { source } : {}),
      },
    });

    return NextResponse.json(ann, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
