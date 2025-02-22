-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
