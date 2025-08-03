import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const usersDB = await prisma.users.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Execute o seed de usuários primeiro.");
    return;
  }
  
  const userIds = usersDB.map(user => user.id);
  console.log(`📊 Criando recompensas para ${userIds.length} usuários`);

  const rewardData = Array.from({ length: 20 }).map(() => {
    const rewardInfo = faker.helpers.arrayElement([
      { 
        name: 'Pontos Livelo', 
        issuer: 'Livelo', 
        quantityRange: { min: 1000, max: 50000 }
      },
      { 
        name: 'Milhas LATAM Pass', 
        issuer: 'LATAM Airlines', 
        quantityRange: { min: 500, max: 25000 }
      },
      { 
        name: 'Pontos Smiles', 
        issuer: 'GOL Linhas Aéreas', 
        quantityRange: { min: 800, max: 30000 }
      },
      { 
        name: 'Pontos TudoAzul', 
        issuer: 'Azul Linhas Aéreas', 
        quantityRange: { min: 600, max: 20000 }
      },
      { 
        name: 'Pontos Esfera', 
        issuer: 'Bradesco', 
        quantityRange: { min: 2000, max: 80000 }
      },
      { 
        name: 'Pontos Membership Rewards', 
        issuer: 'American Express', 
        quantityRange: { min: 1500, max: 60000 }
      },
      { 
        name: 'Pontos Multiplus', 
        issuer: 'Itaú', 
        quantityRange: { min: 1000, max: 40000 }
      },
      { 
        name: 'Pontos Dotz', 
        issuer: 'Dotz', 
        quantityRange: { min: 500, max: 15000 }
      },
      { 
        name: 'Cashback Nubank', 
        issuer: 'Nubank', 
        quantityRange: { min: 50, max: 2000 }
      },
      { 
        name: 'Pontos Petrobras Premmia', 
        issuer: 'Petrobras', 
        quantityRange: { min: 300, max: 10000 }
      }
    ]);

    return {
      name: rewardInfo.name,
      quantity: parseFloat(faker.number.int({
        min: rewardInfo.quantityRange.min,
        max: rewardInfo.quantityRange.max
      }).toFixed(2)),
      dueDate: faker.date.between({
        from: new Date(),
        to: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000) // +3 anos
      }),
      issuer: rewardInfo.issuer,
      userId: faker.helpers.arrayElement(userIds)
    };
  });

  const result = await prisma.rewards.createMany({
    data: rewardData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} recompensas criadas com sucesso`);
  
  // Mostrar estatísticas
  const rewardStats = await prisma.rewards.groupBy({
    by: ['issuer'],
    _count: { issuer: true },
    _sum: { quantity: true }
  });

  console.log('🎁 Distribuição por emissor:');
  rewardStats.forEach(stat => {
    const avgQuantity = stat._sum.quantity && stat._count.issuer 
      ? (stat._sum.quantity.toNumber() / stat._count.issuer).toFixed(0)
      : '0';
    console.log(`   └─ ${stat.issuer}: ${stat._count.issuer} recompensas (média: ${avgQuantity} pontos)`);
  });

  // Mostrar recompensas próximas do vencimento (próximos 6 meses)
  const soonToExpire = await prisma.rewards.count({
    where: {
      dueDate: {
        lte: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000)
      }
    }
  });

  if (soonToExpire > 0) {
    console.log(`⚠️  ${soonToExpire} recompensas vencendo nos próximos 6 meses`);
  }
}

main()
  .catch(e => {
    console.error('❌ Erro ao criar recompensas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });