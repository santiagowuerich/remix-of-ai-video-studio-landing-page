import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  QrCode, 
  Search, 
  History, 
  Clock, 
  Users, 
  CalendarCheck,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  Plus,
  Ticket,
  X,
  ShoppingBag,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  Eye,
  EyeOff,
  DollarSign,
  Package,
  Banknote,
  Smartphone,
  CreditCard,
  ArrowRightLeft,
  Gift,
  Printer,
  Download,
  FileText
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products as initialProducts, Product, formatPrice } from '@/lib/merch-data';

type ValidationResult = 'idle' | 'success' | 'error';

interface RecentEntry {
  id: string;
  time: string;
  code: string;
  name: string;
  status: 'valid' | 'invalid';
}

interface EventDate {
  id: string;
  date: Date;
  timeSlot: string;
  ticketsSold: number;
  maxCapacity: number;
  manualTickets: number;
}

interface ManualTicket {
  id: string;
  name: string;
  dni: string;
  ticketType: 'general' | 'estudiante' | 'jubilado';
  dateId: string;
  createdAt: Date;
}

// Extended product for admin with visibility
interface AdminProduct extends Product {
  visible: boolean;
}

// === Cierre de Caja types ===
interface CajaTicket {
  id: string;
  total_price: number;
  status: 'paid' | 'pending' | 'cancelled';
  payment_method: 'cash' | 'qr' | 'mercadopago' | 'transfer' | 'invitation';
  purchase_date: Date;
  customer_name: string;
  event_name: string;
  quantity: number;
}

// === Mock data for Cierre de Caja ===
const today = new Date();
const generateCajaTickets = (): CajaTicket[] => {
  const h = (hour: number, min: number) => {
    const d = new Date(today);
    d.setHours(hour, min, 0, 0);
    return d;
  };
  return [
    { id: 'TK-001', total_price: 4500, status: 'paid', payment_method: 'cash', purchase_date: h(9, 15), customer_name: 'María González', event_name: 'Visita Guiada Diurna', quantity: 2 },
    { id: 'TK-002', total_price: 2250, status: 'paid', payment_method: 'mercadopago', purchase_date: h(9, 32), customer_name: 'Carlos Rodríguez', event_name: 'Visita Guiada Diurna', quantity: 1 },
    { id: 'TK-003', total_price: 6750, status: 'paid', payment_method: 'qr', purchase_date: h(10, 5), customer_name: 'Ana Martínez', event_name: 'Visita Guiada Diurna', quantity: 3 },
    { id: 'TK-004', total_price: 2250, status: 'pending', payment_method: 'transfer', purchase_date: h(10, 20), customer_name: 'Jorge Fernández', event_name: 'Visita Nocturna', quantity: 1 },
    { id: 'TK-005', total_price: 9000, status: 'paid', payment_method: 'cash', purchase_date: h(10, 45), customer_name: 'Laura Sánchez', event_name: 'Visita Guiada Diurna', quantity: 4 },
    { id: 'TK-006', total_price: 0, status: 'paid', payment_method: 'invitation', purchase_date: h(11, 0), customer_name: 'Pedro Álvarez', event_name: 'Visita Guiada Diurna', quantity: 2 },
    { id: 'TK-007', total_price: 4500, status: 'paid', payment_method: 'transfer', purchase_date: h(11, 30), customer_name: 'Lucía Ramírez', event_name: 'Visita Nocturna', quantity: 2 },
    { id: 'TK-008', total_price: 2250, status: 'cancelled', payment_method: 'mercadopago', purchase_date: h(12, 0), customer_name: 'Martín López', event_name: 'Visita Guiada Diurna', quantity: 1 },
    { id: 'TK-009', total_price: 2250, status: 'paid', payment_method: 'qr', purchase_date: h(12, 15), customer_name: 'Valentina Torres', event_name: 'Visita Guiada Diurna', quantity: 1 },
    { id: 'TK-010', total_price: 6750, status: 'paid', payment_method: 'cash', purchase_date: h(13, 0), customer_name: 'Roberto Díaz', event_name: 'Visita Nocturna', quantity: 3 },
    { id: 'TK-011', total_price: 4500, status: 'paid', payment_method: 'mercadopago', purchase_date: h(14, 10), customer_name: 'Camila Herrera', event_name: 'Visita Guiada Diurna', quantity: 2 },
    { id: 'TK-012', total_price: 2250, status: 'paid', payment_method: 'cash', purchase_date: h(14, 45), customer_name: 'Diego Morales', event_name: 'Visita Nocturna', quantity: 1 },
    { id: 'TK-013', total_price: 0, status: 'paid', payment_method: 'invitation', purchase_date: h(15, 0), customer_name: 'Sofía Ruiz', event_name: 'Visita Guiada Diurna', quantity: 1 },
    { id: 'TK-014', total_price: 9000, status: 'paid', payment_method: 'transfer', purchase_date: h(15, 30), customer_name: 'Andrés Vega', event_name: 'Visita Nocturna', quantity: 4 },
    { id: 'TK-015', total_price: 4500, status: 'paid', payment_method: 'qr', purchase_date: h(16, 0), customer_name: 'Florencia Castro', event_name: 'Visita Guiada Diurna', quantity: 2 },
  ];
};

const cajaTickets = generateCajaTickets();

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);

const paymentMethodInfo: Record<string, { label: string; icon: typeof Banknote; color: string }> = {
  cash: { label: 'Efectivo', icon: Banknote, color: 'text-[hsl(var(--status-success))]' },
  qr: { label: 'QR', icon: Smartphone, color: 'text-institucional' },
  mercadopago: { label: 'MercadoPago', icon: CreditCard, color: 'text-[hsl(var(--polo-cyan))]' },
  transfer: { label: 'Transferencia', icon: ArrowRightLeft, color: 'text-[hsl(var(--polo-violet))]' },
  invitation: { label: 'Invitación', icon: Gift, color: 'text-[hsl(var(--polo-orange))]' },
};

// === Original sidebar items (unchanged) ===
const sidebarItems = [
  { icon: Home, label: 'Inicio / KPIs', active: true },
  { icon: Calendar, label: 'Evento / Fechas', active: false },
  { icon: QrCode, label: 'Validar Entrada', active: false },
  { icon: Search, label: 'Buscar Reserva', active: false },
  { icon: History, label: 'Historial', active: false },
];

const mockRecentEntries: RecentEntry[] = [
  { id: '1', time: '14:32', code: 'TK-2024-0892', name: 'María González', status: 'valid' },
  { id: '2', time: '14:28', code: 'TK-2024-0891', name: 'Carlos Rodríguez', status: 'valid' },
  { id: '3', time: '14:25', code: 'TK-2024-0890', name: 'Ana Martínez', status: 'valid' },
  { id: '4', time: '14:20', code: 'TK-2024-0889', name: 'Jorge Fernández', status: 'valid' },
  { id: '5', time: '14:15', code: 'TK-2024-0888', name: 'Laura Sánchez', status: 'valid' },
];

const generateEventDates = (): EventDate[] => {
  const dates: EventDate[] = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    dates.push({
      id: `date-${i}-am`,
      date: new Date(date),
      timeSlot: '10:00 - 14:00',
      ticketsSold: Math.floor(Math.random() * 80),
      maxCapacity: 100,
      manualTickets: Math.floor(Math.random() * 10),
    });
    
    dates.push({
      id: `date-${i}-pm`,
      date: new Date(date),
      timeSlot: '16:00 - 20:00',
      ticketsSold: Math.floor(Math.random() * 60),
      maxCapacity: 100,
      manualTickets: Math.floor(Math.random() * 15),
    });
  }
  
  return dates;
};

const PRODUCT_CATEGORIES = ['Indumentaria', 'Accesorios', 'Papelería', 'Hogar'];

const emptyProduct: Omit<AdminProduct, 'id'> = {
  name: '',
  shortDescription: '',
  description: '',
  price: 0,
  image: '',
  material: '',
  inspiration: '',
  sizes: [],
  colors: [],
  category: 'Accesorios',
  visible: true,
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ticketCode, setTicketCode] = useState('');
  const [dniSearch, setDniSearch] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult>('idle');
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>(mockRecentEntries);
  const [activeSection, setActiveSection] = useState<'kpis' | 'eventos' | 'merch' | 'cierreCaja'>('kpis');
  const [eventDates, setEventDates] = useState<EventDate[]>(generateEventDates);
  const [manualTickets, setManualTickets] = useState<ManualTicket[]>([]);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState<string>('');
  const [newTicket, setNewTicket] = useState<{ name: string; dni: string; ticketType: 'general' | 'estudiante' | 'jubilado' }>({ name: '', dni: '', ticketType: 'general' });
  const inputRef = useRef<HTMLInputElement>(null);

  // Merch admin state
  const [merchProducts, setMerchProducts] = useState<AdminProduct[]>(
    initialProducts.map(p => ({ ...p, visible: true }))
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState<Omit<AdminProduct, 'id'>>(emptyProduct);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [sizesInput, setSizesInput] = useState('');
  const [colorsInput, setColorsInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  // === Cierre de Caja state ===
  const [cajaDate, setCajaDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [cajaRealCash, setCajaRealCash] = useState<string>('');

  // Métricas simuladas
  const visitorsToday = 145;
  const maxCapacity = 300;
  const currentOccupancy = 85;
  const maxOccupancy = 150;
  const nextTurnTime = '18:00';
  const nextTurnReservations = 45;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeSection === 'kpis') {
      inputRef.current?.focus();
    }
  }, [activeSection]);

  // === Cierre de Caja computed values ===
  const filteredCajaTickets = cajaTickets.filter(t => {
    const ticketDate = t.purchase_date.toISOString().split('T')[0];
    return ticketDate === cajaDate;
  });

  const paidTickets = filteredCajaTickets.filter(t => t.status === 'paid');
  const totalVendido = paidTickets.reduce((sum, t) => sum + t.total_price, 0);
  const ticketsVendidos = paidTickets.reduce((sum, t) => sum + t.quantity, 0);
  const ticketPromedio = ticketsVendidos > 0 ? totalVendido / ticketsVendidos : 0;

  const paymentBreakdown = Object.entries(
    paidTickets.reduce((acc, t) => {
      if (!acc[t.payment_method]) acc[t.payment_method] = { count: 0, total: 0 };
      acc[t.payment_method].count += 1;
      acc[t.payment_method].total += t.total_price;
      return acc;
    }, {} as Record<string, { count: number; total: number }>)
  );

  const totalTeoricoEfectivo = paidTickets
    .filter(t => t.payment_method === 'cash')
    .reduce((sum, t) => sum + t.total_price, 0);

  const realCashNumber = parseFloat(cajaRealCash) || 0;
  const diferenciaCaja = totalTeoricoEfectivo - realCashNumber;

  const handleExportCSV = () => {
    const header = 'Hora,Evento,Cliente,Cantidad,Método de Pago,Total\n';
    const rows = paidTickets.map(t => {
      const hora = t.purchase_date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
      const metodo = paymentMethodInfo[t.payment_method]?.label || t.payment_method;
      return `${hora},"${t.event_name}","${t.customer_name}",${t.quantity},${metodo},${t.total_price}`;
    }).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cierre-caja-${cajaDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleValidation = () => {
    if (!ticketCode.trim()) return;
    
    if (ticketCode.toUpperCase() === 'OK') {
      setValidationResult('success');
      const newEntry: RecentEntry = {
        id: Date.now().toString(),
        time: currentTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        code: `TK-2024-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: 'Juan Pérez',
        status: 'valid',
      };
      setRecentEntries([newEntry, ...recentEntries.slice(0, 4)]);
    } else {
      setValidationResult('error');
    }
    
    setTimeout(() => {
      setValidationResult('idle');
      setTicketCode('');
      inputRef.current?.focus();
    }, 3000);
  };

  const handleAddManualTicket = () => {
    if (!newTicket.name.trim() || !newTicket.dni.trim() || !selectedDateId) return;
    
    const ticket: ManualTicket = {
      id: `MT-${Date.now()}`,
      name: newTicket.name,
      dni: newTicket.dni,
      ticketType: newTicket.ticketType,
      dateId: selectedDateId,
      createdAt: new Date(),
    };
    
    setManualTickets([ticket, ...manualTickets]);
    
    setEventDates(prev => prev.map(d => 
      d.id === selectedDateId 
        ? { ...d, manualTickets: d.manualTickets + 1 }
        : d
    ));
    
    setNewTicket({ name: '', dni: '', ticketType: 'general' });
    setSelectedDateId('');
    setIsAddTicketOpen(false);
  };

  // === Merch admin handlers ===
  const openNewProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setSizesInput('');
    setColorsInput('');
    setImagePreview('');
    setIsProductModalOpen(true);
  };

  const openEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      image: product.image,
      material: product.material,
      inspiration: product.inspiration,
      sizes: product.sizes || [],
      colors: product.colors || [],
      category: product.category,
      visible: product.visible,
    });
    setSizesInput((product.sizes || []).join(', '));
    setColorsInput((product.colors || []).join(', '));
    setImagePreview(product.image);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name.trim() || !productForm.price) return;

    const sizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const colors = colorsInput.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      setMerchProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...productForm, sizes, colors }
          : p
      ));
    } else {
      const newProduct: AdminProduct = {
        id: `prod-${Date.now()}`,
        ...productForm,
        sizes,
        colors,
      };
      setMerchProducts(prev => [...prev, newProduct]);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setMerchProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
  };

  const toggleProductVisibility = (id: string) => {
    setMerchProducts(prev => prev.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setProductForm(prev => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const occupancyPercentage = (currentOccupancy / maxOccupancy) * 100;

  const totalTicketsSold = eventDates.reduce((sum, d) => sum + d.ticketsSold + d.manualTickets, 0);
  const futureDates = eventDates.filter(d => d.date >= new Date() || isToday(d.date));

  const sidebarNavItems = [
    { icon: Home, label: 'Inicio / KPIs', section: 'kpis' as const },
    { icon: Calendar, label: 'Evento / Fechas', section: 'eventos' as const },
    { icon: ShoppingBag, label: 'Merchandising', section: 'merch' as const },
    { icon: Banknote, label: 'Cierre de Caja', section: 'cierreCaja' as const },
  ];

  const visibleProducts = merchProducts.filter(p => p.visible).length;
  const totalMerchValue = merchProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Sidebar */}
      <aside className="no-print w-20 lg:w-64 bg-[#121212] border-r border-border flex flex-col py-6">
        <div className="px-4 mb-8 hidden lg:block">
          <h2 className="font-serif text-lg text-foreground">Control de Acceso</h2>
          <p className="text-xs text-muted-foreground">Museo La Unidad</p>
        </div>
        
        <div className="px-4 mb-4 hidden lg:block">
          <p className="text-xs text-muted-foreground mb-1">Admin Museo</p>
          <p className="text-xs text-institucional font-medium">Administrador</p>
        </div>
        
        <nav className="flex-1 space-y-2 px-3">
          {sidebarNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${activeSection === item.section 
                  ? 'bg-institucional/20 text-institucional' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{item.label}</span>
            </button>
          ))}
          
          <div className="border-t border-border my-4" />
          
          {sidebarItems.slice(2).map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="no-print bg-[#1f1f1f] border-b border-border px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm capitalize">{formatDate(currentTime)}</p>
              <p className="text-2xl font-mono text-foreground tracking-wider">{formatTime(currentTime)}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por DNI..."
                  value={dniSearch}
                  onChange={(e) => setDniSearch(e.target.value)}
                  className="pl-10 w-48 lg:w-64 bg-[#2d2d2d] border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 rounded-lg">
                <User className="w-4 h-4 text-institucional" />
                <span className="text-sm text-foreground hidden sm:block">Operador: Puerta Principal</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {activeSection === 'kpis' ? (
            <>
              {/* KPI Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[hsl(var(--status-success))]/20">
                      <Users className="w-5 h-5 text-[hsl(var(--status-success))]" />
                    </div>
                    <span className="text-muted-foreground text-sm">Visitantes Ingresados Hoy</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{visitorsToday}</span>
                    <span className="text-muted-foreground text-lg mb-1">/ {maxCapacity}</span>
                  </div>
                  <Progress value={(visitorsToday / maxCapacity) * 100} className="mt-4 h-2 bg-[#1a1a1a]" />
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${occupancyPercentage > 80 ? 'bg-[hsl(var(--status-warning))]/20' : 'bg-[hsl(var(--status-success))]/20'}`}>
                      <AlertTriangle className={`w-5 h-5 ${occupancyPercentage > 80 ? 'text-[hsl(var(--status-warning))]' : 'text-[hsl(var(--status-success))]'}`} />
                    </div>
                    <span className="text-muted-foreground text-sm">Aforo Actual en Tiempo Real</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{currentOccupancy}</span>
                    <span className="text-muted-foreground text-lg mb-1">personas adentro</span>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${occupancyPercentage > 80 ? 'bg-[hsl(var(--status-warning))]' : 'bg-[hsl(var(--status-success))]'}`}
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-institucional/20">
                      <CalendarCheck className="w-5 h-5 text-institucional" />
                    </div>
                    <span className="text-muted-foreground text-sm">Próximo Turno</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{nextTurnTime}</span>
                    <span className="text-muted-foreground text-lg mb-1">hs</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="text-institucional font-semibold">{nextTurnReservations}</span> reservas confirmadas
                  </p>
                </div>
              </section>

              {/* Validación Rápida */}
              <section className="bg-[#2d2d2d] rounded-xl p-8 border border-border">
                <h3 className="text-xl font-serif text-foreground mb-6 flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-institucional" />
                  Validación Rápida
                </h3>
                
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="relative">
                    <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Escanear QR o Ingresar Código..."
                      value={ticketCode}
                      onChange={(e) => setTicketCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleValidation()}
                      className="pl-14 h-16 text-lg bg-[#1a1a1a] border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-institucional transition-colors"
                    />
                  </div>
                  
                  <Button
                    onClick={handleValidation}
                    disabled={!ticketCode.trim()}
                    className="w-full h-14 text-lg font-semibold bg-institucional hover:bg-institucional-light text-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Validar Acceso
                  </Button>

                  {validationResult !== 'idle' && (
                    <div
                      className={`p-6 rounded-xl border-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4
                        ${validationResult === 'success' 
                          ? 'bg-[hsl(var(--status-success))]/10 border-[hsl(var(--status-success))]' 
                          : 'bg-[hsl(var(--status-danger))]/10 border-[hsl(var(--status-danger))]'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        {validationResult === 'success' ? (
                          <CheckCircle2 className="w-12 h-12 text-[hsl(var(--status-success))]" />
                        ) : (
                          <XCircle className="w-12 h-12 text-[hsl(var(--status-danger))]" />
                        )}
                        <div>
                          <h4 className={`text-2xl font-bold ${validationResult === 'success' ? 'text-[hsl(var(--status-success))]' : 'text-[hsl(var(--status-danger))]'}`}>
                            {validationResult === 'success' ? 'ACCESO PERMITIDO' : 'ACCESO DENEGADO'}
                          </h4>
                          <p className="text-foreground text-lg">
                            {validationResult === 'success' 
                              ? 'Juan Pérez (Entrada General)' 
                              : 'Ticket ya usado o inválido'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Ingresos Recientes */}
              <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-institucional" />
                  Ingresos Recientes
                </h3>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Hora</TableHead>
                        <TableHead className="text-muted-foreground">Código</TableHead>
                        <TableHead className="text-muted-foreground">Nombre</TableHead>
                        <TableHead className="text-muted-foreground text-right">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentEntries.map((entry) => (
                        <TableRow key={entry.id} className="border-border hover:bg-[#1a1a1a]">
                          <TableCell className="font-mono text-foreground">{entry.time}</TableCell>
                          <TableCell className="font-mono text-muted-foreground">{entry.code}</TableCell>
                          <TableCell className="text-foreground">{entry.name}</TableCell>
                          <TableCell className="text-right">
                            <Badge 
                              className="bg-[hsl(var(--status-success))]/20 text-[hsl(var(--status-success))] border-[hsl(var(--status-success))]/30"
                            >
                              Válido
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>
            </>
          ) : activeSection === 'eventos' ? (
            <>
              {/* Sección de Evento */}
              <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground flex items-center gap-3">
                      <Ticket className="w-7 h-7 text-institucional" />
                      Visita Guiada - Museo La Unidad
                    </h3>
                    <p className="text-muted-foreground mt-1">Gestión de fechas y entradas</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1a1a1a] px-4 py-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Vendidas</p>
                      <p className="text-2xl font-bold text-[hsl(var(--status-success))]">{totalTicketsSold}</p>
                    </div>
                    
                    <Button
                      onClick={() => setIsAddTicketOpen(true)}
                      className="h-12 px-6 bg-institucional hover:bg-institucional-light text-background font-semibold"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Agregar Ticket Manual
                    </Button>
                  </div>
                </div>

                {/* Fechas del Evento */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Próximas Fechas
                  </h4>
                  
                  <div className="grid gap-3">
                    {futureDates.slice(0, 12).map((eventDate) => {
                      const totalSold = eventDate.ticketsSold + eventDate.manualTickets;
                      const percentage = (totalSold / eventDate.maxCapacity) * 100;
                      const isFull = totalSold >= eventDate.maxCapacity;
                      
                      return (
                        <div 
                          key={eventDate.id}
                          className={`bg-[#1a1a1a] rounded-lg p-4 border transition-all
                            ${isToday(eventDate.date) ? 'border-institucional' : 'border-border'}
                            ${isFull ? 'opacity-60' : ''}
                          `}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`text-center min-w-[60px] ${isToday(eventDate.date) ? 'text-institucional' : 'text-foreground'}`}>
                                <p className="text-2xl font-bold">{eventDate.date.getDate()}</p>
                                <p className="text-xs text-muted-foreground uppercase">
                                  {eventDate.date.toLocaleDateString('es-AR', { month: 'short' })}
                                </p>
                              </div>
                              
                              <div className="border-l border-border pl-4">
                                <p className="text-foreground font-medium capitalize">
                                  {eventDate.date.toLocaleDateString('es-AR', { weekday: 'long' })}
                                  {isToday(eventDate.date) && (
                                    <Badge className="ml-2 bg-institucional/20 text-institucional border-institucional/30">Hoy</Badge>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">{eventDate.timeSlot}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Online</p>
                                <p className="text-lg font-semibold text-foreground">{eventDate.ticketsSold}</p>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Manual</p>
                                <p className="text-lg font-semibold text-institucional">{eventDate.manualTickets}</p>
                              </div>
                              
                              <div className="min-w-[120px]">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className={isFull ? 'text-[hsl(var(--status-danger))]' : 'text-muted-foreground'}>
                                    {totalSold}/{eventDate.maxCapacity}
                                  </span>
                                  <span className={`font-medium ${isFull ? 'text-[hsl(var(--status-danger))]' : percentage > 70 ? 'text-[hsl(var(--status-warning))]' : 'text-[hsl(var(--status-success))]'}`}>
                                    {Math.round(percentage)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all ${isFull ? 'bg-[hsl(var(--status-danger))]' : percentage > 70 ? 'bg-[hsl(var(--status-warning))]' : 'bg-[hsl(var(--status-success))]'}`}
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                  />
                                </div>
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedDateId(eventDate.id);
                                  setIsAddTicketOpen(true);
                                }}
                                disabled={isFull}
                                className="border-border text-foreground hover:bg-[#2d2d2d]"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Tickets Manuales Recientes */}
              {manualTickets.length > 0 && (
                <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-serif text-foreground mb-4 flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-institucional" />
                    Tickets Manuales Agregados
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Código</TableHead>
                          <TableHead className="text-muted-foreground">Nombre</TableHead>
                          <TableHead className="text-muted-foreground">DNI</TableHead>
                          <TableHead className="text-muted-foreground">Tipo</TableHead>
                          <TableHead className="text-muted-foreground text-right">Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {manualTickets.slice(0, 10).map((ticket) => {
                          const eventDate = eventDates.find(d => d.id === ticket.dateId);
                          return (
                            <TableRow key={ticket.id} className="border-border hover:bg-[#1a1a1a]">
                              <TableCell className="font-mono text-foreground">{ticket.id}</TableCell>
                              <TableCell className="text-foreground">{ticket.name}</TableCell>
                              <TableCell className="text-muted-foreground">{ticket.dni}</TableCell>
                              <TableCell>
                                <Badge className="bg-institucional/20 text-institucional border-institucional/30 capitalize">
                                  {ticket.ticketType}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right text-muted-foreground">
                                {eventDate && `${formatShortDate(eventDate.date)} - ${eventDate.timeSlot}`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </section>
              )}
            </>
          ) : activeSection === 'cierreCaja' ? (
            /* ============================== */
            /* CIERRE DE CAJA SECTION         */
            /* ============================== */
            <>
              {/* Header */}
              <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-serif text-foreground flex items-center gap-3">
                    <Banknote className="w-7 h-7 text-institucional" />
                    Cierre de Caja
                  </h3>
                  <p className="text-muted-foreground mt-1">Resumen financiero del día</p>
                </div>

                <div className="flex items-center gap-3 no-print">
                  <Input
                    type="date"
                    value={cajaDate}
                    onChange={(e) => setCajaDate(e.target.value)}
                    className="bg-[#2d2d2d] border-border text-foreground w-44"
                  />
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="border-border text-foreground hover:bg-[#2d2d2d]"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button
                    onClick={handleExportCSV}
                    className="bg-institucional hover:bg-institucional-light text-background font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
              </section>

              {paidTickets.length === 0 ? (
                <section className="bg-[#2d2d2d] rounded-xl p-12 border border-border text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">No se registraron movimientos para esta fecha.</p>
                </section>
              ) : (
                <>
                  {/* KPI Cards */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[hsl(var(--status-success))]/20">
                          <DollarSign className="w-5 h-5 text-[hsl(var(--status-success))]" />
                        </div>
                        <span className="text-muted-foreground text-sm">Total Vendido</span>
                      </div>
                      <span className="text-3xl font-bold text-foreground">{formatCurrency(totalVendido)}</span>
                    </div>

                    <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-institucional/20">
                          <Ticket className="w-5 h-5 text-institucional" />
                        </div>
                        <span className="text-muted-foreground text-sm">Tickets Vendidos</span>
                      </div>
                      <span className="text-3xl font-bold text-foreground">{ticketsVendidos}</span>
                    </div>

                    <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[hsl(var(--polo-cyan))]/20">
                          <CreditCard className="w-5 h-5 text-[hsl(var(--polo-cyan))]" />
                        </div>
                        <span className="text-muted-foreground text-sm">Ticket Promedio</span>
                      </div>
                      <span className="text-3xl font-bold text-foreground">{formatCurrency(ticketPromedio)}</span>
                    </div>
                  </section>

                  {/* Desglose por Método de Pago */}
                  <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                    <h4 className="text-lg font-serif text-foreground mb-4 flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-institucional" />
                      Desglose por Método de Pago
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {paymentBreakdown.map(([method, data]) => {
                        const info = paymentMethodInfo[method];
                        const Icon = info?.icon || Banknote;
                        return (
                          <div key={method} className="bg-[#1a1a1a] rounded-lg p-4 border border-border">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-[#2d2d2d]">
                                <Icon className={`w-5 h-5 ${info?.color || 'text-muted-foreground'}`} />
                              </div>
                              <span className="text-sm font-medium text-foreground">{info?.label || method}</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{formatCurrency(data.total)}</p>
                            <p className="text-xs text-muted-foreground mt-1">{data.count} operacion{data.count !== 1 ? 'es' : ''}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Arqueo de Caja */}
                  <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                    <h4 className="text-lg font-serif text-foreground mb-4 flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-institucional" />
                      Arqueo de Caja (Efectivo)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#1a1a1a] rounded-lg p-5 border border-border text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Teórico</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(totalTeoricoEfectivo)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Según sistema</p>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-lg p-5 border border-border text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Real</p>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={cajaRealCash}
                          onChange={(e) => setCajaRealCash(e.target.value)}
                          className="bg-[#2d2d2d] border-border text-foreground text-center text-xl font-bold h-12 no-print"
                        />
                        {/* Print-only value */}
                        <p className="text-2xl font-bold text-foreground hidden print-show">{formatCurrency(realCashNumber)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Conteo manual</p>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-lg p-5 border border-border text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Diferencia</p>
                        <p className={`text-2xl font-bold ${
                          cajaRealCash === '' ? 'text-muted-foreground' :
                          diferenciaCaja === 0 ? 'text-[hsl(var(--status-success))]' : 'text-[hsl(var(--status-danger))]'
                        }`}>
                          {cajaRealCash === '' ? '—' : formatCurrency(diferenciaCaja)}
                        </p>
                        <p className="text-xs mt-1">
                          {cajaRealCash === '' ? (
                            <span className="text-muted-foreground">Ingresá el total real</span>
                          ) : diferenciaCaja === 0 ? (
                            <span className="text-[hsl(var(--status-success))]">✓ Cuadra</span>
                          ) : (
                            <span className="text-[hsl(var(--status-danger))]">✗ Descuadre</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Tabla de Operaciones */}
                  <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                    <h4 className="text-lg font-serif text-foreground mb-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-institucional" />
                      Listado de Operaciones
                    </h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-muted-foreground">Hora</TableHead>
                            <TableHead className="text-muted-foreground">Evento</TableHead>
                            <TableHead className="text-muted-foreground">Cliente</TableHead>
                            <TableHead className="text-muted-foreground text-center">Cantidad</TableHead>
                            <TableHead className="text-muted-foreground">Método de Pago</TableHead>
                            <TableHead className="text-muted-foreground text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paidTickets.map((t) => {
                            const info = paymentMethodInfo[t.payment_method];
                            const Icon = info?.icon || Banknote;
                            return (
                              <TableRow key={t.id} className="border-border hover:bg-[#1a1a1a]">
                                <TableCell className="font-mono text-foreground">
                                  {t.purchase_date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                                </TableCell>
                                <TableCell className="text-foreground">{t.event_name}</TableCell>
                                <TableCell className="text-foreground">{t.customer_name}</TableCell>
                                <TableCell className="text-center text-foreground">{t.quantity}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${info?.color}`} />
                                    <span className="text-foreground">{info?.label}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right font-mono text-foreground font-semibold">
                                  {formatCurrency(t.total_price)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </section>
                </>
              )}
            </>
          ) : (
            /* ============================== */
            /* MERCHANDISING ADMIN SECTION    */
            /* ============================== */
            <>
              {/* KPIs de Merch */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-institucional/20">
                      <Package className="w-5 h-5 text-institucional" />
                    </div>
                    <span className="text-muted-foreground text-sm">Productos Totales</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{merchProducts.length}</span>
                    <span className="text-muted-foreground text-lg mb-1">items</span>
                  </div>
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[hsl(var(--status-success))]/20">
                      <Eye className="w-5 h-5 text-[hsl(var(--status-success))]" />
                    </div>
                    <span className="text-muted-foreground text-sm">Productos Visibles</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{visibleProducts}</span>
                    <span className="text-muted-foreground text-lg mb-1">/ {merchProducts.length}</span>
                  </div>
                </div>

                <div className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-institucional/20">
                      <DollarSign className="w-5 h-5 text-institucional" />
                    </div>
                    <span className="text-muted-foreground text-sm">Categorías Activas</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      {new Set(merchProducts.map(p => p.category)).size}
                    </span>
                    <span className="text-muted-foreground text-lg mb-1">categorías</span>
                  </div>
                </div>
              </section>

              {/* Product Table */}
              <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground flex items-center gap-3">
                      <ShoppingBag className="w-7 h-7 text-institucional" />
                      Gestión de Productos
                    </h3>
                    <p className="text-muted-foreground mt-1">Administrar catálogo de merchandising</p>
                  </div>
                  
                  <Button
                    onClick={openNewProduct}
                    className="h-12 px-6 bg-institucional hover:bg-institucional-light text-background font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nuevo Producto
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground w-16">Imagen</TableHead>
                        <TableHead className="text-muted-foreground">Producto</TableHead>
                        <TableHead className="text-muted-foreground">Categoría</TableHead>
                        <TableHead className="text-muted-foreground">Precio</TableHead>
                        <TableHead className="text-muted-foreground">Estado</TableHead>
                        <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {merchProducts.map((product) => (
                        <TableRow key={product.id} className="border-border hover:bg-[#1a1a1a]">
                          <TableCell>
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1a1a1a] border border-border">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-foreground font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.shortDescription}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-institucional/20 text-institucional border-institucional/30">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-foreground font-mono">{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => toggleProductVisibility(product.id)}
                              className="flex items-center gap-1.5"
                            >
                              {product.visible ? (
                                <Badge className="bg-[hsl(var(--status-success))]/20 text-[hsl(var(--status-success))] border-[hsl(var(--status-success))]/30 cursor-pointer">
                                  <Eye className="w-3 h-3 mr-1" /> Visible
                                </Badge>
                              ) : (
                                <Badge className="bg-muted text-muted-foreground border-border cursor-pointer">
                                  <EyeOff className="w-3 h-3 mr-1" /> Oculto
                                </Badge>
                              )}
                            </button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditProduct(product)}
                                className="border-border text-foreground hover:bg-[#1a1a1a] hover:text-institucional"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteConfirmId(product.id)}
                                className="border-border text-foreground hover:bg-[hsl(var(--status-danger))]/10 hover:text-[hsl(var(--status-danger))] hover:border-[hsl(var(--status-danger))]/30"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* Modal Agregar Ticket Manual */}
      <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
        <DialogContent className="bg-[#2d2d2d] border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif flex items-center gap-2">
              <Ticket className="w-5 h-5 text-institucional" />
              Agregar Ticket Manual
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Nombre Completo</label>
              <Input
                value={newTicket.name}
                onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                placeholder="Ingrese nombre..."
                className="bg-[#1a1a1a] border-border text-foreground"
              />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">DNI</label>
              <Input
                value={newTicket.dni}
                onChange={(e) => setNewTicket({ ...newTicket, dni: e.target.value })}
                placeholder="Ingrese DNI..."
                className="bg-[#1a1a1a] border-border text-foreground"
              />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Tipo de Entrada</label>
              <Select 
                value={newTicket.ticketType} 
                onValueChange={(value: 'general' | 'estudiante' | 'jubilado') => setNewTicket({ ...newTicket, ticketType: value })}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2d2d2d] border-border">
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="estudiante">Estudiante</SelectItem>
                  <SelectItem value="jubilado">Jubilado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Fecha y Turno</label>
              <Select value={selectedDateId} onValueChange={setSelectedDateId}>
                <SelectTrigger className="bg-[#1a1a1a] border-border text-foreground">
                  <SelectValue placeholder="Seleccione fecha..." />
                </SelectTrigger>
                <SelectContent className="bg-[#2d2d2d] border-border max-h-[200px]">
                  {futureDates.map((d) => {
                    const totalSold = d.ticketsSold + d.manualTickets;
                    const isFull = totalSold >= d.maxCapacity;
                    return (
                      <SelectItem 
                        key={d.id} 
                        value={d.id}
                        disabled={isFull}
                        className="text-foreground"
                      >
                        {formatShortDate(d.date)} - {d.timeSlot} ({totalSold}/{d.maxCapacity})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddTicketOpen(false)}
                className="flex-1 border-border text-foreground hover:bg-[#1a1a1a]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddManualTicket}
                disabled={!newTicket.name.trim() || !newTicket.dni.trim() || !selectedDateId}
                className="flex-1 bg-institucional hover:bg-institucional-light text-background"
              >
                Agregar Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Producto (Crear / Editar) */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="bg-[#2d2d2d] border-border text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-institucional" />
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 pt-4">
            {/* Image Upload */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Imagen del Producto</label>
              <div className="flex items-start gap-4">
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-[#1a1a1a] border border-border flex-shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px]">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border bg-[#1a1a1a] cursor-pointer hover:border-institucional/50 transition-colors">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Subir imagen...</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG o WEBP. Recomendado: 800×800px</p>
                  {imagePreview && (
                    <button
                      onClick={() => { setImagePreview(''); setProductForm(prev => ({ ...prev, image: '' })); }}
                      className="text-xs text-[hsl(var(--status-danger))] hover:underline mt-1"
                    >
                      Eliminar imagen
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Nombre del Producto *</label>
              <Input
                value={productForm.name}
                onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Remera La Unidad"
                className="bg-[#1a1a1a] border-border text-foreground"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Descripción corta</label>
              <Input
                value={productForm.shortDescription}
                onChange={(e) => setProductForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Breve descripción para la grilla"
                className="bg-[#1a1a1a] border-border text-foreground"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Descripción completa</label>
              <Textarea
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción detallada del producto..."
                rows={3}
                className="bg-[#1a1a1a] border-border text-foreground resize-none"
              />
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Precio (ARS) *</label>
                <Input
                  type="number"
                  value={productForm.price || ''}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="12000"
                  className="bg-[#1a1a1a] border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Categoría</label>
                <Select
                  value={productForm.category}
                  onValueChange={(val) => setProductForm(prev => ({ ...prev, category: val }))}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2d2d2d] border-border">
                    {PRODUCT_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Material</label>
              <Input
                value={productForm.material}
                onChange={(e) => setProductForm(prev => ({ ...prev, material: e.target.value }))}
                placeholder="Ej: Algodón orgánico 180g"
                className="bg-[#1a1a1a] border-border text-foreground"
              />
            </div>

            {/* Inspiration */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Inspiración / Concepto</label>
              <Textarea
                value={productForm.inspiration}
                onChange={(e) => setProductForm(prev => ({ ...prev, inspiration: e.target.value }))}
                placeholder="Conexión con la historia del museo..."
                rows={2}
                className="bg-[#1a1a1a] border-border text-foreground resize-none"
              />
            </div>

            {/* Sizes + Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Talles (separados por coma)</label>
                <Input
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="S, M, L, XL"
                  className="bg-[#1a1a1a] border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Colores (separados por coma)</label>
                <Input
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  placeholder="Negro, Blanco"
                  className="bg-[#1a1a1a] border-border text-foreground"
                />
              </div>
            </div>

            {/* Visible toggle */}
            <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-lg border border-border">
              <div>
                <p className="text-sm text-foreground font-medium">Visible en la tienda</p>
                <p className="text-xs text-muted-foreground">Si está desactivado, el producto no se mostrará a los visitantes</p>
              </div>
              <button
                onClick={() => setProductForm(prev => ({ ...prev, visible: !prev.visible }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${productForm.visible ? 'bg-institucional' : 'bg-muted'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-transform ${productForm.visible ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsProductModalOpen(false)}
                className="flex-1 border-border text-foreground hover:bg-[#1a1a1a]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProduct}
                disabled={!productForm.name.trim() || !productForm.price}
                className="flex-1 bg-institucional hover:bg-institucional-light text-background font-semibold"
              >
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="bg-[#2d2d2d] border-border text-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-[hsl(var(--status-danger))]" />
              Eliminar Producto
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            ¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="flex-1 border-border text-foreground hover:bg-[#1a1a1a]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => deleteConfirmId && handleDeleteProduct(deleteConfirmId)}
              className="flex-1 bg-[hsl(var(--status-danger))] hover:bg-[hsl(var(--status-danger))]/80 text-foreground font-semibold"
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
