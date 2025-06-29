-- CreateEnum
CREATE TYPE "KnowledgeSourceType" AS ENUM ('URL', 'FILE', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "KnowledgeStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "knowledge_bases" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceType" "KnowledgeSourceType" NOT NULL,
    "content" JSONB,
    "status" "KnowledgeStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_bases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "knowledge_bases_user_id_idx" ON "knowledge_bases"("user_id");

-- AddForeignKey
ALTER TABLE "knowledge_bases" ADD CONSTRAINT "knowledge_bases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
