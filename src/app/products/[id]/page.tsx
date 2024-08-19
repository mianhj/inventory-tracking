import ProductForm from '../components/ProductForm';

export type ProductPageProps = {
  params: { id: string };
};

function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container">
      <ProductForm id={params.id} />
    </div>
  );
}

export default ProductPage;
