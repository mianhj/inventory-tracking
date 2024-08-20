import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
type RouteParamType = { params: { productId: string } };

export async function GET(req: NextRequest, { params }: RouteParamType) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1') || 1;
  const limit = parseInt(searchParams.get('limit') || '10');

  const where: Prisma.StockHistoryWhereInput = {
    productId: parseInt(params.productId),
  };
  // Get total count of filtered products
  const totalCount = await prisma.stockHistory.count({ where });

  // Pagination and sorting
  const stockHistory = await prisma.stockHistory.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({
    totalCount,
    page,
    limit,
    stockHistory,
  });
}
