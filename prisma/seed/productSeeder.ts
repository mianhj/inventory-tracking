import { PrismaClient } from '@prisma/client';

const data = [
  {
    image: 'https://example.com/products/laptop.jpg',
    name: 'Laptop Pro 15',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
    stock: 20,
    price: 1299.99,
  },
  {
    image: 'https://example.com/products/phone.jpg',
    name: 'Smartphone X',
    description: 'Latest smartphone with an advanced camera and OLED display.',
    stock: 50,
    price: 999.99,
  },
  {
    image: 'https://example.com/products/headphones.jpg',
    name: 'Wireless Headphones',
    description:
      'Noise-canceling wireless headphones with 20 hours battery life.',
    stock: 75,
    price: 199.99,
  },
  {
    image: 'https://example.com/products/smartwatch.jpg',
    name: 'Smartwatch Series 5',
    description: 'Smartwatch with fitness tracking and GPS.',
    stock: 35,
    price: 299.99,
  },
  {
    image: 'https://example.com/products/keyboard.jpg',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches.',
    stock: 60,
    price: 89.99,
  },
  {
    image: 'https://example.com/products/monitor.jpg',
    name: '4K Monitor',
    description: '27-inch 4K UHD monitor with HDR support.',
    stock: 40,
    price: 399.99,
  },
  {
    image: 'https://example.com/products/mouse.jpg',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons.',
    stock: 100,
    price: 59.99,
  },
  {
    image: 'https://example.com/products/speaker.jpg',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360° sound.',
    stock: 80,
    price: 129.99,
  },
  {
    image: 'https://example.com/products/tablet.jpg',
    name: 'Tablet Pro 10',
    description: '10-inch tablet with stylus support and 128GB storage.',
    stock: 25,
    price: 499.99,
  },
  {
    image: 'https://example.com/products/camera.jpg',
    name: 'Mirrorless Camera',
    description: '24MP mirrorless camera with 4K video recording.',
    stock: 15,
    price: 1499.99,
  },
  {
    image: 'https://example.com/products/charger.jpg',
    name: 'Wireless Charger',
    description: 'Fast wireless charger compatible with Qi-enabled devices.',
    stock: 120,
    price: 39.99,
  },
  {
    image: 'https://example.com/products/drone.jpg',
    name: 'Drone X',
    description: 'Compact drone with 4K camera and GPS stabilization.',
    stock: 10,
    price: 799.99,
  },
  {
    image: 'https://example.com/products/tv.jpg',
    name: 'Smart TV 55',
    description: '55-inch 4K Smart TV with built-in streaming apps.',
    stock: 30,
    price: 699.99,
  },
  {
    image: 'https://example.com/products/router.jpg',
    name: 'Wi-Fi 6 Router',
    description: 'Dual-band Wi-Fi 6 router with mesh network support.',
    stock: 45,
    price: 129.99,
  },
  {
    image: 'https://example.com/products/headset.jpg',
    name: 'Gaming Headset',
    description: '7.1 surround sound gaming headset with noise-canceling mic.',
    stock: 65,
    price: 99.99,
  },
  {
    image: 'https://example.com/products/external-ssd.jpg',
    name: 'External SSD 1TB',
    description: 'Portable 1TB external SSD with USB-C interface.',
    stock: 50,
    price: 179.99,
  },
  {
    image: 'https://example.com/products/printer.jpg',
    name: 'Wireless Printer',
    description: 'All-in-one wireless printer with scanner and copier.',
    stock: 22,
    price: 159.99,
  },
  {
    image: 'https://example.com/products/smart-light.jpg',
    name: 'Smart Light Bulb',
    description:
      'Color-changing smart light bulb compatible with voice assistants.',
    stock: 150,
    price: 29.99,
  },
  {
    image: 'https://example.com/products/coffee-maker.jpg',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with a 12-cup capacity.',
    stock: 35,
    price: 69.99,
  },
  {
    image: 'https://example.com/products/soundbar.jpg',
    name: 'Soundbar System',
    description: '2.1 channel soundbar with wireless subwoofer.',
    stock: 18,
    price: 249.99,
  },
];

export const seedProducts = async () => {
  const prisma = new PrismaClient();

  try {
    const existing = await prisma.product.findMany({ take: 1 });
    if (existing.length > 0) return;
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: data.map((p, i) => {
        return {
          ...p,
          image: `https://picsum.photos/${120 + i}`,
          createdById: 1,
          lastUpdatedById: 1,
          stockHistory: {
            create: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
              (item, index) => ({
                stock: item,
                difference: index % 2 == 0 ? -1 * item : item,
                description:
                  'Note about the stock change. Lorem Ipsum dolor sit amet',
                createdById: 1,
              })
            ),
          },
        };
      }),
    });
  } catch (err) {
    console.log('Product Seeder Err: ', err);
  } finally {
    prisma.$disconnect();
  }
  console.log('Product seeded.');
};
