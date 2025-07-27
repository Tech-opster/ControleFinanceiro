import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const rewardData = Array.from({ length: 5 }).map(() => ({
    programa: faker.company.name(),
    quantidade: parseFloat(faker.finance.amount()),
    dataVencimento: faker.date.future(),
    emissor: faker.company.name(),
  }));

  await prisma.rewards.createMany({
    data: rewardData,
    skipDuplicates: true,
  });

  console.log('✅ Pontuações de teste criadas');
}

main()
  .catch(e => {
    console.error('Erro ao criar pontuações:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
