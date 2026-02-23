import { products, Product } from '@/lib/merch-data';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid = ({ onSelectProduct }: ProductGridProps) => {
  return (
    <section id="productos" className="section-padding">
      <div className="container-museum">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
