// prisma/seed.ts
import { PrismaClient } from '../generated/prisma'; // ou 'prisma/prisma-client' se estiver usando o caminho padrão

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      { email: 'gabriel@example.com', name: 'Gabriel', cpf: '12345678901' },
      { email: 'maria@example.com', name: 'Maria', cpf: '98765432100' },
      { email: 'joao@example.com', name: 'João', cpf: '11122233344' },
    ],
    skipDuplicates: true, // pra não dar erro se rodar várias vezes
  });

  console.log('Seed finalizado!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
