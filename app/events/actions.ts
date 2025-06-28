"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../lib/auth";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  date: z.coerce.date(),
  location: z.string().min(1, "Location is required"),
});

export async function createEvent(prevState: any, formData: FormData) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(requestHeaders),
  });
  if (!session) {
    return {
      success: false,
      error: "You must be logged in to create an event.",
    };
  }

  const result = createEventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    location: formData.get("location"),
  });

  if (!result.success) {
    return {
      success: false,
      error: "Invalid event data.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        ...result.data,
        organizerId: session.user.id,
      },
    });

    revalidatePath("/events");

    return { success: true, data: newEvent };
  } catch (error) {
    console.error("Event creation error:", error);
    return { success: false, error: "Failed to create event." };
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
      include: {
        organizer: true, // Include organizer details if needed
      },
    });
    return { success: true, data: events };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: "Failed to fetch events." };
  }
}
