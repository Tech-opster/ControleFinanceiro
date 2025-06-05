/*
  Warnings:

  - You are about to drop the column `cpf` on the `Users` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_cpf_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "cpf",
ADD COLUMN     "passwordHash" VARCHAR(255) NOT NULL;
