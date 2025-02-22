/*
  Warnings:

  - Changed the type of `authType` on the `authentications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('password', 'google_oauth');

-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "authType",
ADD COLUMN     "authType" "AuthType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "authentications_userId_authType_key" ON "authentications"("userId", "authType");
