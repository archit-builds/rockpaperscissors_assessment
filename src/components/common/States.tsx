import type { HTMLAttributes } from 'react';
import { Loader2, Inbox, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-line/70 dark:bg-line-dark/70', className)}
      {...props}
    />
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('size-4 animate-spin text-muted dark:text-muted-dark', className)} />;
}

interface StatePanelProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: StatePanelProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-canvas dark:bg-ink-800">
        <Inbox className="size-5 text-muted dark:text-muted-dark" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-text dark:text-text-dark">{title}</p>
        {description && <p className="text-[13px] text-muted dark:text-muted-dark">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ title, description, action }: StatePanelProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-signal-red-bg">
        <AlertTriangle className="size-5 text-signal-red" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-text dark:text-text-dark">{title}</p>
        {description && <p className="text-[13px] text-muted dark:text-muted-dark">{description}</p>}
      </div>
      {action}
    </div>
  );
}
