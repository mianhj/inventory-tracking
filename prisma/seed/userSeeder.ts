import { PrismaClient } from '@prisma/client';

type UserEntity = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const data: UserEntity[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$zzIBPunKKTiTXKPEBmP26Oen88EOsdCx445BEzu055aW3y6Ubik2O', // abcd1234
  },
];

export const seedUsers = async () => {
  const prisma = new PrismaClient();

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
