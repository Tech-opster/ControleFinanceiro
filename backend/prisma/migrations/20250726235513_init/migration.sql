-- CreateTable
CREATE TABLE "Incomes" (
    "id" SERIAL NOT NULL,
    "receita" VARCHAR(255) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);
