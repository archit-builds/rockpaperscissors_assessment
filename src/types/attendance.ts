export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'wfh' | 'leave';

export interface AttendanceRecord {
  employeeId: string;
  date: string; // ISO yyyy-MM-dd
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
}
