-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "RoleEnum" NOT NULL DEFAULT 'MEMBER';
