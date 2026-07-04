import { useQuery } from '@tanstack/react-query';
import { fetchAttendanceForEmployee, fetchAttendanceForDate } from '@/api/attendanceApi';

export function useMyAttendance(employeeId: string | undefined) {
  return useQuery({
    queryKey: ['attendance', 'employee', employeeId],
    queryFn: () => fetchAttendanceForEmployee(employeeId!),
    enabled: !!employeeId,
  });
}

export function useAttendanceForDate(date: string) {
  return useQuery({
    queryKey: ['attendance', 'date', date],
    queryFn: () => fetchAttendanceForDate(date),
  });
}
