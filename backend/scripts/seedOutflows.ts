import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  const categories = [
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

  for (const category of categories) {
    await prisma.categories.upsert({
      where: { category },
      update: {},
      create: { category },
    });
  }

  const categoriesDB = await prisma.categories.findMany();
  const categoriaIds = categoriesDB.map((cat) => cat.id);

  console.log(`✅ ${categoriesDB.length} categorias de teste criadas`);

  const outflowData = Array.from({ length: 10 }).map(() => ({
    outflow: faker.commerce.product(),
    amount: parseFloat(faker.commerce.price()),
    date: faker.date.recent({ days: 90 }),
    categoryId: faker.helpers.arrayElement(categoriaIds),
    status: faker.datatype.boolean(),
  }));

  await prisma.outflows.createMany({
    data: outflowData,
    skipDuplicates: true,
  });

  console.log("✅ Saídas de teste criadas");
}

main()
  .catch((e) => {
    console.error("Erro ao criar saídas:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
