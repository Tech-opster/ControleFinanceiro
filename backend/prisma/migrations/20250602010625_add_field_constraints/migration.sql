/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cpf` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
