import prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  const usersDB = await prisma.users.findMany();
  const categoriesDB = await prisma.categories.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Execute o seed de usuários primeiro.");
    return;
  }

  if (categoriesDB.length === 0) {
    console.warn("⚠️ Nenhuma categoria encontrada. Execute o seed de categorias primeiro.");
    return;
  }
  
  const userIds = usersDB.map((user) => user.id);
  const categoryIds = categoriesDB.map((cat) => cat.id);
  
  console.log(`📊 Criando saídas para ${userIds.length} usuários e ${categoriesDB.length} categorias`);

  const outflowData = Array.from({ length: 1000 }).map(() => ({
    name: faker.helpers.arrayElement([
      'Supermercado',
      'Gasolina',
      'Restaurante',
      'Academia',
      'Internet',
      'Luz',
      'Água',
      'Farmácia',
      'Streaming',
      'Transporte',
      'Roupas',
      'Livros',
      'Cinema',
      'Lanche',
      'Café',
      'Uber',
      'Delivery',
      'Medicamentos',
      'Presente',
      'Manutenção'
    ]),
    amount: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    date: faker.date.between({ 
      from: new Date('2024-01-01'), 
      to: new Date() 
    }),
    categoryId: faker.helpers.arrayElement(categoryIds),
    status: faker.datatype.boolean({ probability: 0.8 }),
    userId: faker.helpers.arrayElement(userIds),
  }));

  const result = await prisma.outflows.createMany({
    data: outflowData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} saídas criadas com sucesso`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao criar saídas:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });