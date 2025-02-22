-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "authType" TEXT NOT NULL,
    "credential" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "authentications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "authentications_userId_authType_key" ON "authentications"("userId", "authType");

-- AddForeignKey
ALTER TABLE "authentications" ADD CONSTRAINT "authentications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
