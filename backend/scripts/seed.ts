import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const usersData = Array.from({ length: 5 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    passwordHash: faker.string.numeric(255),
  }));

  await prisma.users.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log('✅ Usuários de teste criados');
}

main()
  .catch(e => {
    console.error('Erro ao criar usuários:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
