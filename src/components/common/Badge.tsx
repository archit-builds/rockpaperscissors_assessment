import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'neutral' | 'green' | 'amber' | 'red' | 'blue';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-canvas text-muted dark:bg-ink-800 dark:text-muted-dark',
  green: 'bg-signal-green-bg text-signal-green',
  amber: 'bg-signal-amber-bg text-signal-amber',
  red: 'bg-signal-red-bg text-signal-red',
  blue: 'bg-signal-blue-bg text-signal-blue',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ tone = 'neutral', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
