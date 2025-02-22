-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
