import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const cryptoData = Array.from({ length: 5 }).map(() => ({
    name: faker.finance.currencyCode(),
    amount: parseFloat(faker.finance.amount()),
    price: parseFloat(faker.finance.amount()),
    quantity: parseFloat(faker.finance.amount()),
    purchaseDate: faker.date.past(),
  }));

  await prisma.cryptos.createMany({
    data: cryptoData,
    skipDuplicates: true,
  });

  console.log('✅ Criptomoedas de teste criadas');
}

main()
  .catch(e => {
    console.error('Erro ao criar criptomoedas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
