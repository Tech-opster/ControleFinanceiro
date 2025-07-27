import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const incomeData = Array.from({ length: 2 }).map(() => ({
    receita: faker.company.name(),
    valor: parseFloat(faker.commerce.price()),
    data: faker.date.anytime(),
  }));

  await prisma.incomes.createMany({
    data: incomeData,
    skipDuplicates: true,
  });

  console.log('✅ Entradas de teste criadas');
}

main()
  .catch(e => {
    console.error('Erro ao criar entradas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
