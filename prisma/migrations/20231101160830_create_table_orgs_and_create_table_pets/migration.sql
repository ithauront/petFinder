-- CreateEnum
CREATE TYPE "SizeEnum" AS ENUM ('pequeno', 'medio', 'grande');

-- CreateEnum
CREATE TYPE "EnergyEnum" AS ENUM ('baixa', 'media', 'alta');

-- CreateEnum
CREATE TYPE "IndependenceEnum" AS ENUM ('baixa', 'media', 'alta');

-- CreateEnum
CREATE TYPE "SpaceEnum" AS ENUM ('pequeno', 'medio', 'amplo');

-- CreateTable
CREATE TABLE "orgs" (
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "pets" (
    "petId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" "SizeEnum" NOT NULL,
    "energyLevel" "EnergyEnum" NOT NULL,
    "independenceLevel" "IndependenceEnum" NOT NULL,
    "spaceRequired" "SpaceEnum" NOT NULL,
    "image" TEXT NOT NULL,
    "adoptionRequirements" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("petId")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
