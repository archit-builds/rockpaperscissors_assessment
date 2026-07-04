import { useQuery } from '@tanstack/react-query';
import { fetchAttendanceForEmployee, fetchAttendanceForDate, fetchAllAttendance } from '@/api/attendanceApi';

export function useAllAttendance() {
  return useQuery({
    queryKey: ['attendance', 'all'],
    queryFn: fetchAllAttendance,
  });
}

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
