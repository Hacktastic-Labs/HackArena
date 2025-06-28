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
