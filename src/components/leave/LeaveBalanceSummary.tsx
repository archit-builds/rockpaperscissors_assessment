import type { LeaveBalance } from '@/types';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Skeleton } from '@/components/common/States';
import { cn } from '@/lib/cn';

export function LeaveBalanceSummary({ balances, loading }: { balances: LeaveBalance[]; loading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-[13px] font-semibold text-text dark:text-text-dark">Leave Balance</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
          : balances
              .filter((b) => b.type !== 'unpaid')
              .map((b) => {
                const pct = Math.min(100, Math.round((b.used / b.total) * 100));
                return (
                  <div key={b.type}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] font-medium text-text dark:text-text-dark">{b.label}</span>
                      <span className="figure text-[12px] text-muted dark:text-muted-dark">
                        {b.used} / {b.total} used
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-canvas dark:bg-ink-800">
                      <div
                        className={cn('h-full rounded-full', pct >= 90 ? 'bg-signal-red' : pct >= 60 ? 'bg-signal-amber' : 'bg-accent-500')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
      </CardBody>
    </Card>
  );
}
