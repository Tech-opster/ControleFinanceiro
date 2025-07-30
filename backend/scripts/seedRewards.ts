import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const rewardData = Array.from({ length: 5 }).map(() => ({
    name: faker.company.name(),
    quantity: parseFloat(faker.finance.amount()),
    dueDate: faker.date.future(),
    issuer: faker.company.name(),
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
