import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  const categoriasDB = await prisma.expenses.findMany();
  const categoriaIds = categoriasDB.map((cat) => cat.id);

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
