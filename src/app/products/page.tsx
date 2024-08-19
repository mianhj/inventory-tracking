import { buttonVariants } from '@/components/ui/button';
import ProductsListing from './components/ProductsListing';
import Link from 'next/link';

function Products() {
  return (
    <div className="container mt-5">
      <div className="flex justify-between align-center mb-3">
        <p className="m-0 text-2xl">Products</p>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={'/products/add'}
        >
          Add New
        </Link>
      </div>
      <ProductsListing />
    </div>
  );
}

export default Products;
