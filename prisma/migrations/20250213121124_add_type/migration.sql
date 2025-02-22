-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'customer';
