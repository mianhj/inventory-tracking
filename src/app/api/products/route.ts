import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validateRequest';
import { createProductSchema } from './schemas/create-product.schema';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/getUserFromRequest';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const search = searchParams.get('search') || '';

  // Filtering and searching logic
  const where: Prisma.ProductWhereInput = {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ],
  };

  // Get total count of filtered products
  const totalCount = await prisma.product.count({ where });

  // Pagination and sorting
  const products = await prisma.product.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json({
    totalCount,
    page,
    limit,
    products,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = getUserFromRequest(req);

  const validationError = await validateRequest(createProductSchema, body);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      ...body,
      createdById: user.id,
      lastUpdatedById: user.id,
      stockHistory: {
        create: [
          {
            stock: parseInt(body.stock),
            difference: parseInt(body.stock),
            description: 'Product Created!',
            createdById: user.id,
          },
        ],
      },
    },
  });

  return NextResponse.json(product);
}
