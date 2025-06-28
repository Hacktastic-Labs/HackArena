import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // ensure not cached

async function fetchTopHNStoryIds(): Promise<number[]> {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  if (!res.ok) throw new Error("Failed to fetch HN ids");
  return res.json();
}

async function fetchHNItem(id: number): Promise<any> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  if (!res.ok) return null;
  return res.json();
}

export async function GET(req: NextRequest) {
  try {
    const ids = await fetchTopHNStoryIds();
    const top = ids.slice(0, 20);
    let created = 0;

    for (const id of top) {
      const item = await fetchHNItem(id);
      if (!item || !item.title || !item.url) continue;

      const exists = await (prisma.announcement as any).findFirst({
        where: {
          url: item.url,
          category: "TECHNEWS",
        },
        select: { id: true },
      });
      if (exists) continue;

      await (prisma.announcement as any).create({
        data: {
          title: item.title,
          description: item.url, // description can just be link if no summary
          category: "TECHNEWS",
          url: item.url,
          source: "HackerNews",
        },
      });
      created++;
    }

    return NextResponse.json({ success: true, created });
  } catch (error) {
    console.error("TechNews refresh error:", error);
    return NextResponse.json(
      { error: "Failed to refresh technews" },
      { status: 500 }
    );
  }
}
