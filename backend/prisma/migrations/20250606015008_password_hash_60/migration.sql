/*
  Warnings:

  - You are about to alter the column `passwordHash` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "passwordHash" SET DATA TYPE VARCHAR(60);
