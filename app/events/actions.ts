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
  date: z.coerce.date().refine((d) => d > new Date(), {
    message: "Event date must be in the future",
  }),
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

export async function getEventsByOrganizer(organizerId: string) {
  try {
    const events = await prisma.event.findMany({
      where: {
        organizerId,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        organizer: true, // Include organizer details to display name, etc.
      },
    });

    return { success: true, data: events };
  } catch (error) {
    console.error("Error fetching organiser events:", error);
    return { success: false, error: "Failed to fetch your events." };
  }
}

export async function getEventWithParticipants(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: true,
        registrations: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!event) {
      return { success: false, error: "Event not found." };
    }

    return { success: true, data: event };
  } catch (error) {
    console.error("Error fetching event details:", error);
    return { success: false, error: "Failed to fetch event details." };
  }
}

export async function registerForEvent(formData: FormData) {
  "use server";

  const eventId = String(formData.get("eventId"));
  if (!eventId) {
    return { success: false, error: "Missing event id." };
  }

  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(requestHeaders),
  });
  if (!session) {
    return { success: false, error: "You must be logged in to register." };
  }

  try {
    // Prevent organiser from registering
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return { success: false, error: "Event not found." };
    }
    if (event.organizerId === session.user.id) {
      return {
        success: false,
        error: "Organiser cannot register for own event.",
      };
    }

    // Create registration if not exists
    await prisma.registration.upsert({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        eventId,
      },
    });

    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to register." };
  }
}

export async function getRegisteredEventIds(userId: string) {
  try {
    const regs = await prisma.registration.findMany({
      where: { userId },
      select: { eventId: true },
    });
    return regs.map((r) => r.eventId);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [] as string[];
  }
}

export async function getRegisteredEventsByUser(userId: string) {
  try {
    const events = await prisma.event.findMany({
      where: {
        registrations: {
          some: {
            userId,
          },
        },
      },
      include: {
        organizer: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    return { success: true, data: events };
  } catch (error) {
    console.error("Error fetching user's registered events:", error);
    return { success: false, error: "Failed to fetch registered events." };
  }
}

export async function cancelEvent(formData: FormData) {
  "use server";
  const eventId = String(formData.get("eventId"));
  if (!eventId) {
    return { success: false, error: "Missing event id." };
  }
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(requestHeaders),
  });
  if (!session) {
    return { success: false, error: "You must be logged in." };
  }
  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return { success: false, error: "Event not found." };
    }
    if (event.organizerId !== session.user.id) {
      return { success: false, error: "Only organiser can cancel this event." };
    }
    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    console.error("Cancel event error:", error);
    return { success: false, error: "Failed to cancel event." };
  }
}
