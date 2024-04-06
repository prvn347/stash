/*
  Warnings:

  - You are about to drop the column `provided` on the `OnRampTransaction` table. All the data in the column will be lost.
  - Added the required column `provider` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "provided",
ADD COLUMN     "provider" TEXT NOT NULL;
