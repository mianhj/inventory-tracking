import { PrismaClient } from '@prisma/client';

const data = [
  { name: 'John Doe', email: 'john@example.com', password: 'abc1234' },
];

export const seedUsers = async () => {
  const prisma = new PrismaClient();
  try {
    await prisma.user.createMany({
      data,
    });
  } catch (err) {
    console.log('User Seeder Err: ', err);
  } finally {
    prisma.$disconnect();
  }
  console.log('Users seeded.');
};
