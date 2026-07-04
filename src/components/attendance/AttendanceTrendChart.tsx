import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { AttendanceRecord } from '@/types';
import { formatDisplayShort } from '@/lib/date';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Skeleton } from '@/components/common/States';

export function AttendanceTrendChart({ records, loading }: { records: AttendanceRecord[]; loading?: boolean }) {
  const data = useMemo(() => {
    const byDate = new Map<string, { present: number; total: number }>();
    records.forEach((r) => {
      const entry = byDate.get(r.date) ?? { present: 0, total: 0 };
      entry.total += 1;
      if (r.status === 'present' || r.status === 'wfh' || r.status === 'half-day') entry.present += 1;
      byDate.set(r.date, entry);
    });
    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({
        date,
        label: formatDisplayShort(date),
        rate: v.total ? Math.round((v.present / v.total) * 100) : 0,
      }));
  }, [records]);

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-[13px] font-semibold text-text dark:text-text-dark">Attendance Rate</h3>
          <p className="mt-0.5 text-[12px] text-muted dark:text-muted-dark">Last 30 working days, company-wide</p>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E7C86" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0E7C86" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-line)" strokeDasharray="3 4" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'var(--color-muted)' }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Attendance rate']}
                  labelFormatter={(label) => label}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid var(--color-line)',
                    boxShadow: 'none',
                  }}
                />
                <Area type="monotone" dataKey="rate" stroke="#0E7C86" strokeWidth={2} fill="url(#attendanceFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
