import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  const usersDB = await prisma.users.findMany();
  
  if (usersDB.length === 0) {
    console.warn("⚠️ Nenhum usuário encontrado. Execute o seed de usuários primeiro.");
    return;
  }
  
  const userIds = usersDB.map(user => user.id);
  console.log(`📊 Criando criptomoedas para ${userIds.length} usuários`);

  const cryptoData = Array.from({ length: 15 }).map(() => {
    const cryptoInfo = faker.helpers.arrayElement([
      { name: 'Bitcoin', symbol: 'BTC', priceRange: { min: 200000, max: 400000 } },
      { name: 'Ethereum', symbol: 'ETH', priceRange: { min: 8000, max: 20000 } },
      { name: 'Binance Coin', symbol: 'BNB', priceRange: { min: 1000, max: 3000 } },
      { name: 'Cardano', symbol: 'ADA', priceRange: { min: 1, max: 5 } },
      { name: 'Solana', symbol: 'SOL', priceRange: { min: 100, max: 800 } },
      { name: 'Polygon', symbol: 'MATIC', priceRange: { min: 2, max: 8 } },
      { name: 'Chainlink', symbol: 'LINK', priceRange: { min: 30, max: 100 } },
      { name: 'Avalanche', symbol: 'AVAX', priceRange: { min: 80, max: 200 } },
      { name: 'Polkadot', symbol: 'DOT', priceRange: { min: 20, max: 60 } },
      { name: 'Shiba Inu', symbol: 'SHIB', priceRange: { min: 0.0001, max: 0.001 } }
    ]);

    const price = faker.number.float({
      min: cryptoInfo.priceRange.min,
      max: cryptoInfo.priceRange.max,
      fractionDigits: 8
    });

    const quantity = faker.number.float({
      min: 0.001,
      max: cryptoInfo.name === 'Bitcoin' ? 2 : 
           cryptoInfo.name === 'Ethereum' ? 10 : 
           cryptoInfo.name === 'Shiba Inu' ? 1000000 : 100,
      fractionDigits: 8
    });

    const amount = price * quantity;

    return {
      name: cryptoInfo.name,
      amount: parseFloat(amount.toFixed(2)),
      price: parseFloat(price.toFixed(8)),
      quantity: parseFloat(quantity.toFixed(8)),
      purchaseDate: faker.date.between({ 
        from: new Date('2023-01-01'), 
        to: new Date() 
      }),
      userId: faker.helpers.arrayElement(userIds)
    };
  });

  const result = await prisma.cryptos.createMany({
    data: cryptoData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} criptomoedas criadas com sucesso`);
  
  // Mostrar estatísticas
  const cryptoStats = await prisma.cryptos.groupBy({
    by: ['name'],
    _count: { name: true },
    _sum: { amount: true }
  });

  console.log('📈 Distribuição por moeda:');
  cryptoStats.forEach(stat => {
    console.log(`   └─ ${stat.name}: ${stat._count.name} posições (R$ ${stat._sum.amount?.toFixed(2)})`);
  });
}

main()
  .catch(e => {
    console.error('❌ Erro ao criar criptomoedas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });