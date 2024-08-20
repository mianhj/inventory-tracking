import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validateRequest';
import prisma from '@/lib/prisma';
import { updateProductSchema } from '../schemas/update-product.schema';
import { getUserFromRequest } from '@/lib/getUserFromRequest';

type RouteParamType = { params: { id: string } };

export async function GET(req: NextRequest, { params }: RouteParamType) {
  const productId = params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(product);
}

const calculateDifference = (stock: number, previousStock: number) => {
  let diff = 0;
  if (stock > previousStock) {
    diff = stock - previousStock;
  } else {
    diff = -1 * (previousStock - stock);
  }

  return diff;
};

export async function PUT(req: NextRequest, { params }: RouteParamType) {
  const productId = params.id;
  const body = await req.json();
  const validationError = await validateRequest(updateProductSchema, body);
  const user = getUserFromRequest(req);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const productBefore = await prisma.product.findFirst({
    where: { id: Number(productId) },
    select: {
      stock: true,
    },
  });

  if (!productBefore) {
    return NextResponse.json(
      { error: 'Product not found' },
      {
        status: 404,
      }
    );
  }

  const difference = calculateDifference(
    parseInt(body.stock),
    productBefore.stock
  );
  const { reason, ...rest } = body;
  const payload = {
    ...rest,
    price: parseFloat(body.price),
    stock: parseInt(body.stock),
  };

  if (difference !== 0) {
    payload.stockHistory = {
      create: [
        {
          stock: parseInt(body.stock),
          difference,
          description: reason || 'Product Updated!',
          createdById: user.id,
        },
      ],
    };
  }

  const product = await prisma.product.update({
    where: { id: Number(productId) },
    data: payload,
  });

  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: RouteParamType) {
  const productId = params.id;

  const product = await prisma.product.delete({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(product);
}
