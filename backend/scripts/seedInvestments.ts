import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const investmentData = Array.from({ length: 10 }).map(() => ({
    emissor: faker.company.name(),
    titulo: faker.finance.transactionType(),
    valor: parseFloat(faker.commerce.price()),
    dataCompra: faker.date.recent({ days: 90 }),
    dataVencimento: faker.date.future(),
    rentabilidade: faker.number.float({min: 1, max: 500,fractionDigits: 2 }),
    banco: faker.company.name()
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
