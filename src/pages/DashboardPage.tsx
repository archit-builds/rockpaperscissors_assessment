import { useMemo } from 'react';
import { UserCheck, UserX, Home, CalendarOff } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/attendance/StatCard';
import { AttendanceTrendChart } from '@/components/attendance/AttendanceTrendChart';
import { MyAttendanceCalendar } from '@/components/attendance/MyAttendanceCalendar';
import { useAllAttendance, useMyAttendance } from '@/hooks/useAttendance';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { todayIso } from '@/lib/date';
import { ErrorState } from '@/components/common/States';
import { Button } from '@/components/common/Button';

export function DashboardPage() {
  const { data: user } = useCurrentUser();
  const { data: allAttendance, isLoading: loadingAll, isError, refetch } = useAllAttendance();
  const { data: myAttendance, isLoading: loadingMine } = useMyAttendance(user?.id);

  const todaysSummary = useMemo(() => {
    if (!allAttendance) return null;
    const today = todayIso();
    const todays = allAttendance.filter((r) => r.date === today);
    return {
      present: todays.filter((r) => r.status === 'present').length,
      absent: todays.filter((r) => r.status === 'absent').length,
      wfh: todays.filter((r) => r.status === 'wfh').length,
      leave: todays.filter((r) => r.status === 'leave').length,
    };
  }, [allAttendance]);

  if (isError) {
    return (
      <DashboardLayout title="Dashboard">
        <ErrorState
          title="Couldn't load attendance data"
          description="Something went wrong while fetching the latest records."
          action={
            <Button size="sm" variant="secondary" onClick={() => refetch()}>
              Try again
            </Button>
          }
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle={user ? `Welcome back, ${user.name.split(' ')[0]}` : undefined}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Present Today" value={todaysSummary?.present ?? 0} icon={UserCheck} tone="green" loading={loadingAll} />
          <StatCard label="Absent Today" value={todaysSummary?.absent ?? 0} icon={UserX} tone="default" loading={loadingAll} />
          <StatCard label="Working Remote" value={todaysSummary?.wfh ?? 0} icon={Home} tone="accent" loading={loadingAll} />
          <StatCard label="On Leave" value={todaysSummary?.leave ?? 0} icon={CalendarOff} tone="amber" loading={loadingAll} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AttendanceTrendChart records={allAttendance ?? []} loading={loadingAll} />
          </div>
          <div className="lg:col-span-2">
            <MyAttendanceCalendar records={myAttendance ?? []} loading={loadingMine} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
