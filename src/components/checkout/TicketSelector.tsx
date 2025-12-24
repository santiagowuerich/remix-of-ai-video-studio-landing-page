import { Minus, Plus, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketSelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  pricePerTicket: number;
}

export function TicketSelector({
  quantity,
  onQuantityChange,
  pricePerTicket,
}: TicketSelectorProps) {
  const decrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ticket Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Entrada General</h3>
            <p className="text-2xl font-bold text-accent">
              ${pricePerTicket.toLocaleString('es-AR')} <span className="text-sm font-normal text-muted-foreground">ARS</span>
            </p>
          </div>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={decrease}
            disabled={quantity <= 1}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
              'border border-border/50',
              quantity <= 1
                ? 'opacity-50 cursor-not-allowed bg-muted'
                : 'bg-card hover:bg-accent hover:text-accent-foreground hover:border-accent'
            )}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
          
          <button
            type="button"
            onClick={increase}
            disabled={quantity >= 10}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
              'border border-border/50',
              quantity >= 10
                ? 'opacity-50 cursor-not-allowed bg-muted'
                : 'bg-card hover:bg-accent hover:text-accent-foreground hover:border-accent'
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="mt-4 pt-4 border-t border-border/30 flex justify-between items-center">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="text-xl font-semibold">
          ${(quantity * pricePerTicket).toLocaleString('es-AR')} ARS
        </span>
      </div>
    </div>
  );
}
