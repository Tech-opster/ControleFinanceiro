import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  const categorias = [
    "Mercado",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Casa",
    "Roupas",
    "Restaurante",
    "Compras",
    "Fixas",
  ];

  console.log("🔄 Criando categorias...");

  for (const categoria of categorias) {
    await prisma.expenses.upsert({
      where: { categoria },
      update: {},
      create: { categoria },
    });
  }

  const categoriasDB = await prisma.expenses.findMany();
  const categoriaIds = categoriasDB.map((cat) => cat.id);

  console.log(`✅ ${categoriasDB.length} categorias prontas`);
  console.log("🔄 Criando despesas...");

  const outflowData = Array.from({ length: 10 }).map(() => ({
    despesa: faker.commerce.product(),
    valor: parseFloat(faker.commerce.price()),
    data: faker.date.recent({ days: 90 }),
    categoriaId: faker.helpers.arrayElement(categoriaIds),
    status: faker.datatype.boolean(),
  }));

  await prisma.outflows.createMany({
    data: outflowData,
    skipDuplicates: true,
  });

  console.log("✅ Despesas de teste criadas");
}

main()
  .catch((e) => {
    console.error("Erro ao criar despesas:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
