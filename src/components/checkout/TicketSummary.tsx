import { Calendar, Clock, Ticket, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketSummaryProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  ticketQuantity: number;
  pricePerTicket: number;
  isFormValid: boolean;
  onSubmit: () => void;
}

export function TicketSummary({
  selectedDate,
  selectedTime,
  ticketQuantity,
  pricePerTicket,
  isFormValid,
  onSubmit,
}: TicketSummaryProps) {
  const subtotal = ticketQuantity * pricePerTicket;
  const serviceFee = 0;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-accent/10 border-b border-border/30 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Ticket className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold">Tu Entrada</h3>
            <p className="text-sm text-muted-foreground">Museo de la Cárcel - La Unidad</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date & Time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-dashed border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Fecha</span>
            </div>
            <span className="font-medium">
              {selectedDate 
                ? selectedDate.toLocaleDateString('es-AR', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  })
                : '—'
              }
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-dashed border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Horario</span>
            </div>
            <span className="font-medium">{selectedTime || '—'}</span>
          </div>
        </div>

        {/* Tickets Breakdown */}
        <div className="space-y-2 py-4 border-b border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Entrada General x{ticketQuantity}
            </span>
            <span>${subtotal.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Costo de servicio</span>
            <span className="text-green-500">Bonificado</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-3xl font-bold text-accent">
            ${total.toLocaleString('es-AR')}
            <span className="text-sm font-normal text-muted-foreground ml-1">ARS</span>
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isFormValid}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300',
            'flex items-center justify-center gap-2',
            isFormValid
              ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 cursor-pointer'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          <ShieldCheck className="w-5 h-5" />
          Confirmar y Pagar ${total.toLocaleString('es-AR')}
        </button>

        {/* Security Note */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          Pago seguro encriptado. Recibirás tu entrada por email.
        </p>
      </div>

      {/* Ticket Bottom Design */}
      <div className="relative">
        <div className="absolute -left-3 -top-3 w-6 h-6 bg-background rounded-full" />
        <div className="absolute -right-3 -top-3 w-6 h-6 bg-background rounded-full" />
        <div className="border-t border-dashed border-border/50 mx-6" />
      </div>
    </div>
  );
}
