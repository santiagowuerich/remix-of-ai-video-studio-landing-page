import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '@/lib/merch-data';
import { MerchHero } from '@/components/merch/MerchHero';
import { ProductGrid } from '@/components/merch/ProductGrid';
import { ProductDetail } from '@/components/merch/ProductDetail';
import { MiniCart } from '@/components/merch/MiniCart';
import { InstitutionalMessage } from '@/components/merch/InstitutionalMessage';
import { MuseumFooter } from '@/components/museum/MuseumFooter';

export default function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  }, []);

  const handleRemoveFromCart = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky top bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 glass-navbar py-3"
      >
        <div className="container-museum flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al museo
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/" className="hidden sm:block">
              <span className="font-semibold text-foreground">La Unidad</span>
              <span className="text-xs text-muted-foreground ml-2">Tienda</span>
            </Link>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-md hover:bg-muted transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-institucional text-background text-xs font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      <main role="main">
        <MerchHero />
        <ProductGrid onSelectProduct={setSelectedProduct} />
        <InstitutionalMessage />
      </main>

      <MuseumFooter />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Mini Cart */}
      <MiniCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}
