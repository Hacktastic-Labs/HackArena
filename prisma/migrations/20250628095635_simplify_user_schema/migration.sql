/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `github_username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "github_username",
DROP COLUMN "last_name",
DROP COLUMN "linkedin_url",
DROP COLUMN "portfolio_url",
DROP COLUMN "role";

-- DropEnum
DROP TYPE "UserRole";
