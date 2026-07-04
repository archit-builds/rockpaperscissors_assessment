import { useMemo } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, isWeekend, isFuture } from 'date-fns';
import type { AttendanceRecord, AttendanceStatus } from '@/types';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Skeleton } from '@/components/common/States';
import { cn } from '@/lib/cn';

const STATUS_DOT: Record<AttendanceStatus, string> = {
  present: 'bg-signal-green',
  wfh: 'bg-signal-blue',
  'half-day': 'bg-signal-amber',
  absent: 'bg-signal-red',
  leave: 'bg-muted',
};

const LEGEND: { status: AttendanceStatus; label: string }[] = [
  { status: 'present', label: 'Present' },
  { status: 'wfh', label: 'WFH' },
  { status: 'half-day', label: 'Half day' },
  { status: 'absent', label: 'Absent' },
  { status: 'leave', label: 'Leave' },
];

export function MyAttendanceCalendar({ records, loading }: { records: AttendanceRecord[]; loading?: boolean }) {
  const byDate = useMemo(() => {
    const map = new Map<string, AttendanceStatus>();
    records.forEach((r) => map.set(r.date, r.status));
    return map;
  }, [records]);

  const today = new Date();
  const days = eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) });
  const leadingBlanks = (days[0].getDay() + 6) % 7; // Monday-first grid

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-[13px] font-semibold text-text dark:text-text-dark">My Attendance</h3>
          <p className="mt-0.5 text-[12px] text-muted dark:text-muted-dark">{format(today, 'MMMM yyyy')}</p>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="text-[11px] font-medium text-muted dark:text-muted-dark">
                  {d}
                </div>
              ))}
              {Array.from({ length: leadingBlanks }).map((_, i) => (
                <div key={`b-${i}`} />
              ))}
              {days.map((day) => {
                const iso = format(day, 'yyyy-MM-dd');
                const status = byDate.get(iso);
                const weekend = isWeekend(day);
                const future = isFuture(day);
                return (
                  <div
                    key={iso}
                    className={cn(
                      'relative flex aspect-square flex-col items-center justify-center rounded-md border border-transparent text-[12px]',
                      isToday(day) && 'border-accent-500',
                      weekend || future ? 'text-muted/50 dark:text-muted-dark/40' : 'text-text dark:text-text-dark'
                    )}
                  >
                    {format(day, 'd')}
                    {status && !weekend && (
                      <span className={cn('absolute bottom-1 size-1.5 rounded-full', STATUS_DOT[status])} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 dark:border-line-dark">
              {LEGEND.map((item) => (
                <div key={item.status} className="flex items-center gap-1.5">
                  <span className={cn('size-1.5 rounded-full', STATUS_DOT[item.status])} />
                  <span className="text-[11px] text-muted dark:text-muted-dark">{item.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
