import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  const usersDB = await prisma.users.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Execute o seed de usuários primeiro.");
    return;
  }
  
  const userIds = usersDB.map((user) => user.id);
  console.log(`📊 Criando entradas para ${userIds.length} usuários`);

  const incomeData = Array.from({ length: 1000 }).map(() => ({
    name: faker.helpers.arrayElement([
      'Salário',
      'Cashback',
      'Freelance',
      'Investimentos',
      'Vendas',
      'Comissão',
      'Bonus',
      'Dividendos',
      'Aluguel',
      'Consultoria',
      'Royalties'
    ]),
    amount: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
    date: faker.date.between({ 
      from: new Date('2024-01-01'), 
      to: new Date() 
    }),
    userId: faker.helpers.arrayElement(userIds),
  }));

  const result = await prisma.incomes.createMany({
    data: incomeData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} entradas de receita criadas com sucesso`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao criar entradas:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });