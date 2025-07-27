import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const cryptoData = Array.from({ length: 5 }).map(() => ({
    moeda: faker.finance.currencyCode(),
    valor: parseFloat(faker.finance.amount()),
    cotacao: parseFloat(faker.finance.amount()),
    quantidade: parseFloat(faker.finance.amount()),
    dataCompra: faker.date.past(),
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
