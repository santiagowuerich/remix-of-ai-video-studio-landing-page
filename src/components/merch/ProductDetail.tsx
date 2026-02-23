import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, MessageCircle, ShoppingBag } from 'lucide-react';
import { Product, formatPrice, CartItem } from '@/lib/merch-data';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetail = ({ product, onClose, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el producto "${product.name}" del Museo La Unidad. ¿Podrían darme más información?`
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="aspect-square bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-institucional mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl font-semibold text-foreground mb-2">{product.name}</h2>
              <p className="text-2xl font-bold text-foreground mb-4">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted-foreground text-sm mb-4">{product.description}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Material: </span>
                  <span className="text-foreground">{product.material}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Inspiración: </span>
                  <span className="text-foreground/80 italic">{product.inspiration}</span>
                </div>
              </div>

              {/* Size selector */}
              {product.sizes && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Talle</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-institucional bg-institucional/10 text-institucional'
                            : 'border-border text-muted-foreground hover:border-foreground/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {product.colors && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                          selectedColor === color
                            ? 'border-institucional bg-institucional/10 text-institucional'
                            : 'border-border text-muted-foreground hover:border-foreground/30'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Cantidad</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:border-institucional transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-foreground font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:border-institucional transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-auto space-y-3">
                <button onClick={handleAdd} className="btn-primary w-full flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al pedido
                </button>
                <a
                  href={`https://wa.me/5493794000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
