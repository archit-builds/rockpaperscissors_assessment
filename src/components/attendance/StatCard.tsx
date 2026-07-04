import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: 'default' | 'accent' | 'amber' | 'green';
  loading?: boolean;
}

const toneIconBg = {
  default: 'bg-canvas text-muted dark:bg-ink-800 dark:text-muted-dark',
  accent: 'bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400',
  amber: 'bg-signal-amber-bg text-signal-amber',
  green: 'bg-signal-green-bg text-signal-green',
};

export function StatCard({ label, value, icon: Icon, tone = 'default', loading }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow">{label}</p>
          {loading ? (
            <div className="mt-2 h-7 w-12 animate-pulse rounded bg-line dark:bg-line-dark" />
          ) : (
            <p className="figure mt-1 text-[28px] font-semibold leading-none text-text dark:text-text-dark">{value}</p>
          )}
        </div>
        <div className={cn('flex size-9 items-center justify-center rounded-lg', toneIconBg[tone])}>
          <Icon className="size-4.5" />
        </div>
      </div>
    </Card>
  );
}
