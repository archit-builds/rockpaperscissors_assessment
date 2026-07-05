import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { CalendarDays } from 'lucide-react';
import { parseISO } from 'date-fns';
import { cn } from '@/lib/cn';
import { toIso, formatDisplay } from '@/lib/date';

interface DatePickerProps {
  value?: string; // ISO
  onChange: (iso: string) => void;
  minDate?: Date;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

const classNames = {
  root: 'p-3 text-[13px]',
  months: 'flex',
  month: 'space-y-3',
  month_caption: 'flex items-center justify-center relative h-8',
  caption_label: 'text-[13px] font-semibold text-text dark:text-text-dark',
  nav: 'flex items-center justify-between absolute inset-x-0 top-0 h-8 px-1',
  button_previous:
    'flex size-7 items-center justify-center rounded-md text-muted hover:bg-canvas hover:text-text disabled:opacity-30 dark:text-muted-dark dark:hover:bg-ink-800 dark:hover:text-text-dark',
  button_next:
    'flex size-7 items-center justify-center rounded-md text-muted hover:bg-canvas hover:text-text disabled:opacity-30 dark:text-muted-dark dark:hover:bg-ink-800 dark:hover:text-text-dark',
  month_grid: 'w-full border-collapse mt-1',
  weekdays: '',
  weekday: 'text-[11px] font-medium text-muted dark:text-muted-dark w-9 pb-1',
  weeks: '',
  week: '',
  day: 'p-0 text-center',
  day_button:
    'size-9 rounded-md text-[13px] text-text hover:bg-canvas transition-colors dark:text-text-dark dark:hover:bg-ink-800',
  selected: '[&>button]:bg-accent-500 [&>button]:text-white [&>button]:hover:bg-accent-600',
  today: '[&>button]:border [&>button]:border-accent-500',
  disabled: '[&>button]:text-muted/30 [&>button]:hover:bg-transparent [&>button]:cursor-not-allowed dark:[&>button]:text-muted-dark/20',
  outside: '[&>button]:text-muted/40 dark:[&>button]:text-muted-dark/30',
};

export function DatePicker({ value, onChange, minDate, placeholder = 'Select date', error, disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedDate = value ? parseISO(value) : undefined;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between rounded-[var(--radius-control)] border border-line bg-surface px-3 py-2 text-left text-sm text-text outline-none transition-colors focus:border-accent-500 disabled:opacity-50 dark:border-line-dark dark:bg-surface-dark dark:text-text-dark',
          error && 'border-signal-red focus:border-signal-red'
        )}
      >
        <span className={cn(!value && 'text-muted/70')}>{value ? formatDisplay(value) : placeholder}</span>
        <CalendarDays className="size-4 text-muted dark:text-muted-dark" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 rounded-[var(--radius-card)] border border-line bg-surface shadow-lg dark:border-line-dark dark:bg-surface-dark">
          <DayPicker
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate ?? minDate}
            onSelect={(date) => {
              if (date) {
                onChange(toIso(date));
                setOpen(false);
              }
            }}
            disabled={minDate ? { before: minDate } : undefined}
            classNames={classNames}
          />
        </div>
      )}
    </div>
  );
}
