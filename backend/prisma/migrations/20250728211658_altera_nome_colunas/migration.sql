/*
  Warnings:

  - You are about to drop the column `categoria` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `cotacao` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `dataCompra` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `moeda` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `cryptos` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `receita` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the column `banco` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `dataCompra` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `dataVencimento` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `emissor` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `rentabilidade` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `investiments` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `outflows` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `outflows` table. All the data in the column will be lost.
  - You are about to drop the column `despesa` on the `outflows` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `outflows` table. All the data in the column will be lost.
  - You are about to drop the column `dataVencimento` on the `rewards` table. All the data in the column will be lost.
  - You are about to drop the column `emissor` on the `rewards` table. All the data in the column will be lost.
  - You are about to drop the column `programa` on the `rewards` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `rewards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `cryptos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentType` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuer` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yieldType` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yieldValue` to the `investiments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `outflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `outflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outflow` to the `outflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `rewards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuer` to the `rewards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loyaltyProgram` to the `rewards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `rewards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "outflows" DROP CONSTRAINT "outflows_categoriaId_fkey";

-- DropIndex
DROP INDEX "categories_categoria_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "categoria",
ADD COLUMN     "category" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "cryptos" DROP COLUMN "cotacao",
DROP COLUMN "dataCompra",
DROP COLUMN "moeda",
DROP COLUMN "quantidade",
DROP COLUMN "valor",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "currency" VARCHAR(64) NOT NULL,
ADD COLUMN     "price" DECIMAL(15,8) NOT NULL,
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quantity" DECIMAL(18,8) NOT NULL;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "data",
DROP COLUMN "receita",
DROP COLUMN "valor",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "income" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "investiments" DROP COLUMN "banco",
DROP COLUMN "dataCompra",
DROP COLUMN "dataVencimento",
DROP COLUMN "emissor",
DROP COLUMN "rentabilidade",
DROP COLUMN "titulo",
DROP COLUMN "valor",
ADD COLUMN     "amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "bank" VARCHAR(64) NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "investmentType" VARCHAR(32) NOT NULL,
ADD COLUMN     "issuer" VARCHAR(64) NOT NULL,
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "yieldType" VARCHAR(32) NOT NULL,
ADD COLUMN     "yieldValue" DECIMAL(10,4) NOT NULL;

-- AlterTable
ALTER TABLE "outflows" DROP COLUMN "categoriaId",
DROP COLUMN "data",
DROP COLUMN "despesa",
DROP COLUMN "valor",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "outflow" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "rewards" DROP COLUMN "dataVencimento",
DROP COLUMN "emissor",
DROP COLUMN "programa",
DROP COLUMN "quantidade",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issuer" VARCHAR(64) NOT NULL,
ADD COLUMN     "loyaltyProgram" VARCHAR(64) NOT NULL,
ADD COLUMN     "quantity" DECIMAL(10,2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_key" ON "categories"("category");

-- AddForeignKey
ALTER TABLE "outflows" ADD CONSTRAINT "outflows_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
