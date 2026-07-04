import type { AttendanceRecord } from '@/types';
import attendanceData from './mockData/attendance.json';
import { withLatency } from './fakeNetwork';

const attendance = attendanceData as AttendanceRecord[];

export async function fetchAttendanceForEmployee(employeeId: string): Promise<AttendanceRecord[]> {
  return withLatency(attendance.filter((a) => a.employeeId === employeeId));
}

export async function fetchAttendanceForDate(date: string): Promise<AttendanceRecord[]> {
  return withLatency(attendance.filter((a) => a.date === date));
}

export async function fetchAllAttendance(): Promise<AttendanceRecord[]> {
  return withLatency(attendance);
}
