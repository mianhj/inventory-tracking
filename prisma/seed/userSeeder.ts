import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

type UserEntity = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const data: UserEntity[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'abc1234' },
];

export const seedUsers = async () => {
  const prisma = new PrismaClient();

  const modifiedData: UserEntity[] = [];

  for (let d of data) {
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(d.password, salt);
    modifiedData.push({ ...d, password });
  }

  try {
    await prisma.user.deleteMany();
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
