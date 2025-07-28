/*
  Warnings:

  - You are about to drop the `investiments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "investiments";

-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "issuer" VARCHAR(64) NOT NULL,
    "investmentType" VARCHAR(32) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "yieldValue" DECIMAL(10,4) NOT NULL,
    "yieldType" VARCHAR(32) NOT NULL,
    "bank" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);
