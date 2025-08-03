import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const usersDB = await prisma.users.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Execute o seed de usuários primeiro.");
    return;
  }
  
  const userIds = usersDB.map(user => user.id);
  console.log(`📊 Criando investimentos para ${userIds.length} usuários`);

  const investmentData = Array.from({ length: 25 }).map(() => {
    const purchaseDate = faker.date.between({ 
      from: new Date('2023-01-01'), 
      to: new Date() 
    });
    
    // Data de vencimento sempre após a compra (6 meses a 5 anos)
    const dueDate = faker.date.between({
      from: new Date(purchaseDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000), // +6 meses
      to: new Date(purchaseDate.getTime() + 5 * 365 * 24 * 60 * 60 * 1000)   // +5 anos
    });

    return {
      name: faker.helpers.arrayElement([
        'CDB Banco do Brasil',
        'LCI Caixa',
        'LCA Itaú',
        'Tesouro Selic',
        'Tesouro IPCA+',
        'Tesouro Prefixado',
        'CRI Kinea',
        'Debênture Petrobras',
        'CDB Nubank',
        'LC Inter',
        'CRA XP',
        'Fundo DI',
        'CDB BTG',
        'LCI Bradesco',
        'CRI Rio Bravo'
      ]),
      investmentType: faker.helpers.arrayElement([
        'CDB',
        'LCI',
        'LCA', 
        'Tesouro Direto',
        'CRI',
        'CRA',
        'Debênture',
        'LC',
        'Fundo RF'
      ]),
      amount: parseFloat(faker.commerce.price({ min: 1000, max: 50000 })),
      purchaseDate,
      dueDate,
      yieldValue: faker.number.float({ min: 8.5, max: 15.8, fractionDigits: 2 }),
      yieldType: faker.helpers.arrayElement([
        '% a.a.',
        '% CDI',
        'IPCA+',
        'Selic+',
        'Prefixado'
      ]),
      bank: faker.helpers.arrayElement([
        'Banco do Brasil',
        'Caixa Econômica',
        'Itaú Unibanco',
        'Bradesco',
        'Santander',
        'BTG Pactual',
        'XP Investimentos',
        'Nubank',
        'Inter',
        'C6 Bank',
        'Modal',
        'Rico',
        'Clear'
      ]),
      userId: faker.helpers.arrayElement(userIds)
    };
  });

  const result = await prisma.investments.createMany({
    data: investmentData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} investimentos criados com sucesso`);
}

main()
  .catch(e => {
    console.error('❌ Erro ao criar investimentos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });