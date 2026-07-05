import type { LeaveRequest, LeaveStatus } from '@/types';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Skeleton } from '@/components/common/States';
import { EmptyState } from '@/components/common/States';
import { formatDisplay, dayCount } from '@/lib/date';

const STATUS_TONE: Record<LeaveStatus, 'green' | 'amber' | 'red'> = {
  approved: 'green',
  pending: 'amber',
  rejected: 'red',
};

const TYPE_LABEL: Record<string, string> = {
  sick: 'Sick',
  casual: 'Casual',
  earned: 'Earned',
  unpaid: 'Unpaid',
};

export function LeaveHistoryList({ leaves, loading }: { leaves: LeaveRequest[]; loading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-[13px] font-semibold text-text dark:text-text-dark">Your Requests</h3>
      </CardHeader>
      <CardBody className="p-0">
        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : leaves.length === 0 ? (
          <EmptyState title="No leave requests yet" description="Submit a request using the form to see it here." />
        ) : (
          <ul className="divide-y divide-line dark:divide-line-dark">
            {leaves.map((leave) => (
              <li key={leave.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-text dark:text-text-dark">{TYPE_LABEL[leave.type]}</span>
                    <span className="text-[12px] text-muted dark:text-muted-dark">
                      {dayCount(leave.startDate, leave.endDate)} day{dayCount(leave.startDate, leave.endDate) > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-muted dark:text-muted-dark">
                    {formatDisplay(leave.startDate)} – {formatDisplay(leave.endDate)}
                  </p>
                </div>
                <Badge tone={STATUS_TONE[leave.status]} dot className="shrink-0 capitalize">
                  {leave.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
