import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const outflowData = Array.from({ length: 10 }).map(() => ({
    despesa: faker.commerce.product(),
    valor: parseFloat(faker.commerce.price()),
    data: faker.date.anytime(),
    categoria: faker.commerce.department(),
    status: faker.datatype.boolean(),
  }));

  await prisma.outflows.createMany({
    data: outflowData,
    skipDuplicates: true,
  });

  console.log('✅ Despesas de teste criadas');
}

main()
  .catch(e => {
    console.error('Erro ao criar despesas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
