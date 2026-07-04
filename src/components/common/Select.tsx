import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full appearance-none rounded-[var(--radius-control)] border border-line bg-surface px-3 py-2 pr-9 text-sm text-text outline-none transition-colors focus:border-accent-500 dark:border-line-dark dark:bg-surface-dark dark:text-text-dark',
          error && 'border-signal-red focus:border-signal-red',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted dark:text-muted-dark" />
    </div>
  );
});
