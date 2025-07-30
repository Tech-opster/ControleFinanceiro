/*
  Warnings:

  - You are about to drop the column `currency` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `issuer` on the `investments` table. All the data in the column will be lost.
  - You are about to drop the column `outflow` on the `outflows` table. All the data in the column will be lost.
  - You are about to drop the column `loyaltyProgram` on the `rewards` table. All the data in the column will be lost.
  - Added the required column `name` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `investments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `outflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `rewards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cryptos" DROP COLUMN "currency",
ADD COLUMN     "name" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "income",
ADD COLUMN     "name" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "investments" DROP COLUMN "issuer",
ADD COLUMN     "name" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "outflows" DROP COLUMN "outflow",
ADD COLUMN     "name" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "rewards" DROP COLUMN "loyaltyProgram",
ADD COLUMN     "name" VARCHAR(64) NOT NULL;
