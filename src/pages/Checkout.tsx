import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DateTimeSelector } from '@/components/checkout/DateTimeSelector';
import { TicketSelector } from '@/components/checkout/TicketSelector';
import { CustomerForm } from '@/components/checkout/CustomerForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { TicketSummary } from '@/components/checkout/TicketSummary';

export interface CustomerData {
  fullName: string;
  dni: string;
  email: string;
  phone: string;
}

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardName: string;
}

const TICKET_PRICE = 2000;

export default function Checkout() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [customerData, setCustomerData] = useState<CustomerData>({
    fullName: '',
    dni: '',
    email: '',
    phone: '',
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: '',
  });

  const isCustomerComplete = useMemo(() => {
    return (
      customerData.fullName.trim() !== '' &&
      customerData.dni.trim() !== '' &&
      customerData.email.trim() !== '' &&
      customerData.phone.trim() !== ''
    );
  }, [customerData]);

  const isPaymentComplete = useMemo(() => {
    return (
      paymentData.cardNumber.replace(/\s/g, '').length >= 16 &&
      paymentData.expiry.length >= 5 &&
      paymentData.cvc.length >= 3 &&
      paymentData.cardName.trim() !== ''
    );
  }, [paymentData]);

  const isFormValid = useMemo(() => {
    return (
      selectedDate !== undefined &&
      selectedTime !== '' &&
      ticketQuantity >= 1 &&
      isCustomerComplete &&
      isPaymentComplete
    );
  }, [selectedDate, selectedTime, ticketQuantity, isCustomerComplete, isPaymentComplete]);

  const total = ticketQuantity * TICKET_PRICE;

  const handleSubmit = () => {
    if (!isFormValid) return;
    alert(`¡Compra confirmada!\nTotal: $${total.toLocaleString('es-AR')} ARS\nFecha: ${selectedDate?.toLocaleDateString('es-AR')}\nHora: ${selectedTime}\nEntradas: ${ticketQuantity}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          Comprar Entradas
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form Steps */}
          <div className="w-full lg:w-[60%] space-y-8">
            {/* Step 1: Date & Time */}
            <section className="glass-card p-6 rounded-xl">
              <h2 className="font-serif text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">1</span>
                Selecciona Fecha y Hora
              </h2>
              <DateTimeSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
              />
            </section>

            {/* Step 2: Tickets */}
            <section className="glass-card p-6 rounded-xl">
              <h2 className="font-serif text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">2</span>
                Cantidad de Entradas
              </h2>
              <TicketSelector
                quantity={ticketQuantity}
                onQuantityChange={setTicketQuantity}
                pricePerTicket={TICKET_PRICE}
              />
            </section>

            {/* Step 3: Customer Data */}
            <section className="glass-card p-6 rounded-xl">
              <h2 className="font-serif text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">3</span>
                Datos del Titular
              </h2>
              <CustomerForm
                data={customerData}
                onChange={setCustomerData}
              />
            </section>

            {/* Step 4: Payment */}
            <section className="glass-card p-6 rounded-xl">
              <h2 className="font-serif text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">4</span>
                Datos de la Tarjeta
              </h2>
              <PaymentForm
                data={paymentData}
                onChange={setPaymentData}
              />
            </section>

            {/* Mobile Summary - Shows below form on mobile */}
            <div className="lg:hidden">
              <TicketSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                ticketQuantity={ticketQuantity}
                pricePerTicket={TICKET_PRICE}
                isFormValid={isFormValid}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          {/* Right Column - Sticky Summary (Desktop only) */}
          <div className="hidden lg:block w-full lg:w-[40%]">
            <div className="sticky top-24">
              <TicketSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                ticketQuantity={ticketQuantity}
                pricePerTicket={TICKET_PRICE}
                isFormValid={isFormValid}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
