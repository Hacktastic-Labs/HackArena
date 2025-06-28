"use server";

import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export async function testDatabaseConnection() {
  try {
    const users = await prisma.user.findMany({
      take: 10,
    });
    console.log("Users from database:", users);
    return { success: true, data: users };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to fetch users" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserProfile({
  userId,
  firstName,
  lastName,
  username,
  githubUsername,
  linkedinUrl,
  portfolioUrl,
  role,
}: {
  userId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  role?: "ADMIN" | "ORGANIZER" | "MENTOR" | "PARTICIPANT";
}) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        username,
        githubUsername,
        linkedinUrl,
        portfolioUrl,
        role,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  } finally {
    await prisma.$disconnect();
  }
}
