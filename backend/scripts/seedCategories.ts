import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  // Primeiro, criar categorias padrão
  const defaultCategories = [
    'Mercado',
    'Farmácia', 
    'Educação',
    'Compras',
    'Transporte',
    'Saúde',
    'Lazer',
    'Restaurante',
    'Casa',
    'Tecnologia'
  ];

  const defaultCategoryData = defaultCategories.map(category => ({
    category,
    isDefault: true,
    createdBy: null // Categorias padrão não têm criador
  }));

  // Verificar se já existem categorias padrão
  const existingDefaults = await prisma.categories.findMany({
    where: { isDefault: true }
  });

  if (existingDefaults.length === 0) {
    const defaultResult = await prisma.categories.createMany({
      data: defaultCategoryData,
      skipDuplicates: true,
    });
    console.log(`✅ ${defaultResult.count} categorias padrão criadas`);
  } else {
    console.log(`📋 ${existingDefaults.length} categorias padrão já existem`);
  }

  // Verificar se existem usuários para criar categorias personalizadas
  const usersDB = await prisma.users.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Pulando criação de categorias personalizadas.");
    return;
  }

  const userIds = usersDB.map(user => user.id);

  // Criar algumas categorias personalizadas
  const customCategories = [
    'Apostas',
    'Combustível',
    'Streaming Premium',
    'Academia Premium',
    'Investimentos',
    'Pets',
    'Hobbies',
    'Viagens'
  ];

  for (const categoryName of customCategories) {
    const randomUserId = faker.helpers.arrayElement(userIds);
    
    // Verificar se a categoria já existe
    const existing = await prisma.categories.findUnique({
      where: { category: categoryName }
    });

    if (!existing) {
      // Criar categoria personalizada
      const category = await prisma.categories.create({
        data: {
          category: categoryName,
          isDefault: false,
          createdBy: randomUserId
        }
      });

      // Dar acesso ao criador
      await prisma.userCategory.create({
        data: {
          userId: randomUserId,
          categoryId: category.id,
          isActive: true
        }
      });

      // 50% de chance de dar acesso a outros usuários aleatórios
      if (faker.datatype.boolean({ probability: 0.5 })) {
        const otherUsers = userIds.filter(id => id !== randomUserId);
        const randomOtherUsers = faker.helpers.arrayElements(
          otherUsers, 
          { min: 1, max: Math.min(3, otherUsers.length) }
        );

        for (const userId of randomOtherUsers) {
          await prisma.userCategory.create({
            data: {
              userId,
              categoryId: category.id,
              isActive: true
            }
          });
        }
      }
    }
  }

  // Contar resultado final
  const allCategories = await prisma.categories.findMany();
  const defaultCount = allCategories.filter(c => c.isDefault).length;
  const customCount = allCategories.filter(c => !c.isDefault).length;

  console.log(`📊 Total: ${allCategories.length} categorias`);
  console.log(`   └─ ${defaultCount} padrão`);
  console.log(`   └─ ${customCount} personalizadas`);
}

main()
  .catch(e => {
    console.error('❌ Erro ao criar categorias:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });