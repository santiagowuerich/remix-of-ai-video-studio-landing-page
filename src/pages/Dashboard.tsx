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
  X
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

// Generar fechas futuras para el evento
const generateEventDates = (): EventDate[] => {
  const dates: EventDate[] = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Turno mañana
    dates.push({
      id: `date-${i}-am`,
      date: new Date(date),
      timeSlot: '10:00 - 14:00',
      ticketsSold: Math.floor(Math.random() * 80),
      maxCapacity: 100,
      manualTickets: Math.floor(Math.random() * 10),
    });
    
    // Turno tarde
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

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ticketCode, setTicketCode] = useState('');
  const [dniSearch, setDniSearch] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult>('idle');
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>(mockRecentEntries);
  const [activeSection, setActiveSection] = useState<'kpis' | 'eventos'>('kpis');
  const [eventDates, setEventDates] = useState<EventDate[]>(generateEventDates);
  const [manualTickets, setManualTickets] = useState<ManualTicket[]>([]);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState<string>('');
  const [newTicket, setNewTicket] = useState<{ name: string; dni: string; ticketType: 'general' | 'estudiante' | 'jubilado' }>({ name: '', dni: '', ticketType: 'general' });
  const inputRef = useRef<HTMLInputElement>(null);

  // Métricas simuladas
  const visitorsToday = 145;
  const maxCapacity = 300;
  const currentOccupancy = 85;
  const maxOccupancy = 150;
  const nextTurnTime = '18:00';
  const nextTurnReservations = 45;

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Autofocus en el input
  useEffect(() => {
    if (activeSection === 'kpis') {
      inputRef.current?.focus();
    }
  }, [activeSection]);

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
    
    // Actualizar contador de tickets manuales en la fecha
    setEventDates(prev => prev.map(d => 
      d.id === selectedDateId 
        ? { ...d, manualTickets: d.manualTickets + 1 }
        : d
    ));
    
    setNewTicket({ name: '', dni: '', ticketType: 'general' });
    setSelectedDateId('');
    setIsAddTicketOpen(false);
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
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-[#121212] border-r border-border flex flex-col py-6">
        <div className="px-4 mb-8 hidden lg:block">
          <h2 className="font-serif text-lg text-foreground">Control de Acceso</h2>
          <p className="text-xs text-muted-foreground">Museo La Unidad</p>
        </div>
        
        <nav className="flex-1 space-y-2 px-3">
          {sidebarNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${activeSection === item.section 
                  ? 'bg-rust/20 text-rust-light' 
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
        <header className="bg-[#1f1f1f] border-b border-border px-6 py-4">
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
                <User className="w-4 h-4 text-rust-light" />
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
                    <div className="p-2 rounded-lg bg-rust/20">
                      <CalendarCheck className="w-5 h-5 text-rust-light" />
                    </div>
                    <span className="text-muted-foreground text-sm">Próximo Turno</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-foreground">{nextTurnTime}</span>
                    <span className="text-muted-foreground text-lg mb-1">hs</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="text-rust-light font-semibold">{nextTurnReservations}</span> reservas confirmadas
                  </p>
                </div>
              </section>

              {/* Validación Rápida */}
              <section className="bg-[#2d2d2d] rounded-xl p-8 border border-border">
                <h3 className="text-xl font-serif text-foreground mb-6 flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-rust-light" />
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
                      className="pl-14 h-16 text-lg bg-[#1a1a1a] border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-rust-light transition-colors"
                    />
                  </div>
                  
                  <Button
                    onClick={handleValidation}
                    disabled={!ticketCode.trim()}
                    className="w-full h-14 text-lg font-semibold bg-rust hover:bg-rust-light text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                  <Clock className="w-5 h-5 text-rust-light" />
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
          ) : (
            <>
              {/* Sección de Evento */}
              <section className="bg-[#2d2d2d] rounded-xl p-6 border border-border">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground flex items-center gap-3">
                      <Ticket className="w-7 h-7 text-rust-light" />
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
                      className="h-12 px-6 bg-rust hover:bg-rust-light text-foreground font-semibold"
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
                            ${isToday(eventDate.date) ? 'border-rust-light' : 'border-border'}
                            ${isFull ? 'opacity-60' : ''}
                          `}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`text-center min-w-[60px] ${isToday(eventDate.date) ? 'text-rust-light' : 'text-foreground'}`}>
                                <p className="text-2xl font-bold">{eventDate.date.getDate()}</p>
                                <p className="text-xs text-muted-foreground uppercase">
                                  {eventDate.date.toLocaleDateString('es-AR', { month: 'short' })}
                                </p>
                              </div>
                              
                              <div className="border-l border-border pl-4">
                                <p className="text-foreground font-medium capitalize">
                                  {eventDate.date.toLocaleDateString('es-AR', { weekday: 'long' })}
                                  {isToday(eventDate.date) && (
                                    <Badge className="ml-2 bg-rust/20 text-rust-light border-rust/30">Hoy</Badge>
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
                                <p className="text-lg font-semibold text-rust-light">{eventDate.manualTickets}</p>
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
                    <Ticket className="w-5 h-5 text-rust-light" />
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
                                <Badge className="bg-rust/20 text-rust-light border-rust/30 capitalize">
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
          )}
        </div>
      </main>

      {/* Modal Agregar Ticket Manual */}
      <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
        <DialogContent className="bg-[#2d2d2d] border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif flex items-center gap-2">
              <Ticket className="w-5 h-5 text-rust-light" />
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
                className="flex-1 bg-rust hover:bg-rust-light text-foreground"
              >
                Agregar Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
