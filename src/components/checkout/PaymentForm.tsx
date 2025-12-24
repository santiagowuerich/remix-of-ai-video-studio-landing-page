import { CreditCard, User } from 'lucide-react';
import type { PaymentData } from '@/pages/Checkout';

interface PaymentFormProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
}

export function PaymentForm({ data, onChange }: PaymentFormProps) {
  const handleChange = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ').slice(0, 19) : '';
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  return (
    <div className="space-y-4">
      {/* Card Visual Preview */}
      <div className="relative bg-gradient-to-br from-cement-600 to-cement-800 rounded-2xl p-6 mb-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded" />
            <CreditCard className="w-8 h-8 text-foreground/50" />
          </div>
          
          <div className="text-xl tracking-widest mb-6 font-mono">
            {data.cardNumber || '•••• •••• •••• ••••'}
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Titular</p>
              <p className="text-sm uppercase tracking-wide">
                {data.cardName || 'NOMBRE APELLIDO'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Vence</p>
              <p className="text-sm">{data.expiry || 'MM/AA'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="relative">
        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Número de tarjeta"
          value={data.cardNumber}
          onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
          maxLength={19}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 font-mono tracking-wider"
        />
      </div>

      {/* Expiry & CVC Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="MM/AA"
            value={data.expiry}
            onChange={(e) => handleChange('expiry', formatExpiry(e.target.value))}
            maxLength={5}
            className="w-full px-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 text-center font-mono"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="CVC"
            value={data.cvc}
            onChange={(e) => handleChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            className="w-full px-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 text-center font-mono"
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Nombre como figura en la tarjeta"
          value={data.cardName}
          onChange={(e) => handleChange('cardName', e.target.value.toUpperCase())}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 uppercase tracking-wide"
        />
      </div>
    </div>
  );
}
