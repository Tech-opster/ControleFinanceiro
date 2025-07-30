import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const investmentData = Array.from({ length: 10 }).map(() => ({
    name: faker.company.name(),
    investmentType: faker.finance.transactionType(),
    amount: parseFloat(faker.commerce.price()),
    purchaseDate: faker.date.recent({ days: 90 }),
    dueDate: faker.date.future(),
    yieldValue: faker.number.float({min: 1, max: 500,fractionDigits: 2 }),
    yieldType: faker.finance.currencyCode(),
    bank: faker.company.name()
  }));

  await prisma.investments.createMany({
    data: investmentData,
    skipDuplicates: true,
  });

  console.log('✅ Investimentos de teste criados');
}

main()
  .catch(e => {
    console.error('Erro ao criar investimentos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
