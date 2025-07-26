-- CreateTable
CREATE TABLE "Outflows" (
    "id" SERIAL NOT NULL,
    "despesa" VARCHAR(255) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Outflows_pkey" PRIMARY KEY ("id")
);
