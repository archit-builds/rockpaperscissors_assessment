export type LeaveType = 'sick' | 'casual' | 'earned' | 'unpaid';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string; // ISO yyyy-MM-dd
  endDate: string; // ISO yyyy-MM-dd
  type: LeaveType;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
}

export interface LeaveBalance {
  type: LeaveType;
  label: string;
  total: number;
  used: number;
}

export interface NewLeaveRequestInput {
  startDate: string;
  endDate: string;
  type: LeaveType;
  reason: string;
}
