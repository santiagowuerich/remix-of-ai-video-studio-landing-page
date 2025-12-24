import { User, CreditCard, Mail, Phone } from 'lucide-react';
import type { CustomerData } from '@/pages/Checkout';

interface CustomerFormProps {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
}

export function CustomerForm({ data, onChange }: CustomerFormProps) {
  const handleChange = (field: keyof CustomerData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Nombre Completo"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* DNI */}
      <div className="relative">
        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="DNI"
          value={data.dni}
          onChange={(e) => handleChange('dni', e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="tel"
          placeholder="Teléfono"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
        />
      </div>
    </div>
  );
}
