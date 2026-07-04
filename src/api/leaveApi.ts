import type { LeaveRequest, NewLeaveRequestInput, LeaveBalance, LeaveType } from '@/types';
import leavesData from './mockData/leaves.json';
import { withLatency } from './fakeNetwork';

// In-memory mutable store simulating a backend — persists for the session only.
let leaves: LeaveRequest[] = structuredClone(leavesData) as LeaveRequest[];

const BALANCE_TOTALS: Record<LeaveType, { total: number; label: string }> = {
  sick: { total: 10, label: 'Sick Leave' },
  casual: { total: 8, label: 'Casual Leave' },
  earned: { total: 15, label: 'Earned Leave' },
  unpaid: { total: 999, label: 'Unpaid Leave' },
};

function countDays(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

export async function fetchLeavesForEmployee(employeeId: string): Promise<LeaveRequest[]> {
  const mine = leaves
    .filter((l) => l.employeeId === employeeId)
    .sort((a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime());
  return withLatency(mine);
}

export async function fetchLeaveBalances(employeeId: string): Promise<LeaveBalance[]> {
  const mine = leaves.filter((l) => l.employeeId === employeeId && l.status !== 'rejected');
  const balances = (Object.keys(BALANCE_TOTALS) as LeaveType[]).map((type) => {
    const used = mine
      .filter((l) => l.type === type && l.status === 'approved')
      .reduce((sum, l) => sum + countDays(l.startDate, l.endDate), 0);
    return { type, label: BALANCE_TOTALS[type].label, total: BALANCE_TOTALS[type].total, used };
  });
  return withLatency(balances, { minMs: 200, maxMs: 500 });
}

export async function createLeaveRequest(employeeId: string, input: NewLeaveRequestInput): Promise<LeaveRequest> {
  const overlapping = leaves.some(
    (l) =>
      l.employeeId === employeeId &&
      l.status !== 'rejected' &&
      !(input.endDate < l.startDate || input.startDate > l.endDate)
  );
  if (overlapping) {
    return Promise.reject(new Error('You already have a leave request overlapping these dates.'));
  }

  const record: LeaveRequest = {
    id: `lv-${Math.random().toString(36).slice(2, 8)}`,
    employeeId,
    startDate: input.startDate,
    endDate: input.endDate,
    type: input.type,
    reason: input.reason,
    status: 'pending',
    appliedOn: new Date().toISOString().slice(0, 10),
  };

  return withLatency(record, { minMs: 400, maxMs: 900, failRate: 0.08 }).then((created) => {
    leaves = [created, ...leaves];
    return created;
  });
}
