/*
  Warnings:

  - You are about to drop the column `authType` on the `authentications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `authentications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "authentications_userId_authType_key";

-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "authType";

-- DropEnum
DROP TYPE "AuthType";

-- CreateIndex
CREATE UNIQUE INDEX "authentications_userId_key" ON "authentications"("userId");
