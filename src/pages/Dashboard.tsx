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
  AlertTriangle
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

type ValidationResult = 'idle' | 'success' | 'error';

interface RecentEntry {
  id: string;
  time: string;
  code: string;
  name: string;
  status: 'valid' | 'invalid';
}

const sidebarItems = [
  { icon: Home, label: 'Inicio / KPIs', active: true },
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

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ticketCode, setTicketCode] = useState('');
  const [dniSearch, setDniSearch] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult>('idle');
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>(mockRecentEntries);
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
    inputRef.current?.focus();
  }, []);

  const handleValidation = () => {
    if (!ticketCode.trim()) return;
    
    // Simulación: "OK" = éxito, cualquier otro = error
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const occupancyPercentage = (currentOccupancy / maxOccupancy) * 100;

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-[#121212] border-r border-border flex flex-col py-6">
        <div className="px-4 mb-8 hidden lg:block">
          <h2 className="font-serif text-lg text-foreground">Control de Acceso</h2>
          <p className="text-xs text-muted-foreground">Museo La Unidad</p>
        </div>
        
        <nav className="flex-1 space-y-2 px-3">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${item.active 
                  ? 'bg-rust/20 text-rust-light' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
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
              {/* Buscador por DNI */}
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
          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Visitantes Ingresados Hoy */}
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

            {/* Aforo Actual */}
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

            {/* Próximo Turno */}
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

              {/* Resultado de Validación */}
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
        </div>
      </main>
    </div>
  );
}
