import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const usersData = Array.from({ length: 30 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    firebaseUid: faker.string.uuid(),
  }));

  const result = await prisma.users.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} usuários criados com sucesso`);
}

main()
  .catch(e => {
    console.error('Erro ao criar usuários:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
