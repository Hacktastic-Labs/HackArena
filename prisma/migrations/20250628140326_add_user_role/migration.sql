-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'MENTOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';
