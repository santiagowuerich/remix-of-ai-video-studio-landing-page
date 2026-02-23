import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { CartItem, formatPrice } from '@/lib/merch-data';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
}

export const MiniCart = ({ isOpen, onClose, items, onRemove }: MiniCartProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const whatsappMessage = encodeURIComponent(
    `Hola! Quiero hacer un pedido del Museo La Unidad:\n\n${items
      .map(
        (item) =>
          `• ${item.product.name}${item.size ? ` (${item.size})` : ''}${item.color ? ` - ${item.color}` : ''} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n')}\n\nTotal: ${formatPrice(total)}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-institucional" />
                <h3 className="text-lg font-semibold text-foreground">Tu Pedido</h3>
                <span className="text-sm text-muted-foreground">({items.length})</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-muted transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Tu pedido está vacío</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-3 rounded-lg bg-muted/30"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{item.product.name}</h4>
                      <div className="text-xs text-muted-foreground space-x-2">
                        {item.size && <span>Talle: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-foreground font-medium">
                          {item.quantity} × {formatPrice(item.product.price)}
                        </span>
                        <button
                          onClick={() => onRemove(index)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">{formatPrice(total)}</span>
                </div>
                <a
                  href={`https://wa.me/5493794000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Finalizar pedido por WhatsApp
                </a>
                <p className="text-xs text-muted-foreground text-center">
                  Serás redirigido a WhatsApp para confirmar tu pedido
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
