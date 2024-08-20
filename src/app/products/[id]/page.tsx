import ProductForm from '../components/ProductForm';
import ProductStockHistory from '../components/ProductStockHistory';

export type ProductPageProps = {
  params: { id: string };
};

function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-1 justify-center">
        <div className="col-span-12 md:col-span-6 pt-10">
          <div className="sticky top-0">
            <ProductForm id={params.id} />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 pt-10">
          <ProductStockHistory id={params.id} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
