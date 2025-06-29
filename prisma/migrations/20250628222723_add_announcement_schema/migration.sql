-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "source" TEXT,
ADD COLUMN     "url" TEXT;
