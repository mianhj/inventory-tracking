import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-2xl mt-10 text-center">
        Welcome to inventory tracking
      </p>
      <Link
        href="/products"
        className={cn(buttonVariants({ variant: 'default' }), 'mt-5')}
      >
        View Product
      </Link>
    </main>
  );
}
