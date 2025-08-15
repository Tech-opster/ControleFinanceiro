/*
  Warnings:

  - Added the required column `bank` to the `cryptos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cryptos" ADD COLUMN     "bank" VARCHAR(64) NOT NULL;
