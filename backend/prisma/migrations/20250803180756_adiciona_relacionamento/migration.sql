/*
  Warnings:

  - A unique constraint covering the columns `[firebaseUid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `investments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `outflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `rewards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseUid` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "cryptos" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "incomes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "investments" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "outflows" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "firebaseUid" VARCHAR(128) NOT NULL;

-- CreateTable
CREATE TABLE "user_categories" (
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_categories_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebaseUid_key" ON "users"("firebaseUid");

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outflows" ADD CONSTRAINT "outflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cryptos" ADD CONSTRAINT "cryptos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
