import { motion } from 'framer-motion';
import { Product, formatPrice } from '@/lib/merch-data';

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export const ProductCard = ({ product, index, onSelect }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-card mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-medium tracking-wider uppercase text-institucional">
            {product.category}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-institucional transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
        {product.shortDescription}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">
          {formatPrice(product.price)}
        </span>
        <span className="text-sm text-institucional font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver detalle →
        </span>
      </div>
    </motion.div>
  );
};
