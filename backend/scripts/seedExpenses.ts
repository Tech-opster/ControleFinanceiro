import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const expenseData = Array.from({ length: 10 }).map(() => ({
    categoria: faker.commerce.product(),
  }));

  await prisma.expenses.createMany({
    data: expenseData,
    skipDuplicates: true,
  });

  console.log('✅ Categorias de teste criadas');
}

main()
  .catch(e => {
    console.error('Erro ao criar categorias:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
