export async function GET() {
  return new Response('products');
}

export async function POST() {
  return new Response('create product');
}

export async function PUT() {
  return new Response('update product');
}

export async function DELETE() {
  return new Response('delete product');
}
