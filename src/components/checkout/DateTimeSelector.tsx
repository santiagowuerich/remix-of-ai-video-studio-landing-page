import { Calendar, Clock } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const availableTimes = ['10:00', '11:30', '14:00', '16:00', '18:00'];

export function DateTimeSelector({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
}: DateTimeSelectorProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Selecciona una fecha</span>
        </div>
        <div className="flex justify-center">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={(date) => date < today}
            className="rounded-lg border border-border/50 bg-card p-3 pointer-events-auto"
          />
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Selecciona un horario</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {availableTimes.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeChange(time)}
              className={cn(
                'px-5 py-3 rounded-full text-sm font-medium transition-all duration-200',
                'border border-border/50 hover:border-accent',
                selectedTime === time
                  ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20'
                  : 'bg-card text-foreground hover:bg-card/80'
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
