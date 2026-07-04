import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeavesForEmployee, fetchLeaveBalances, createLeaveRequest } from '@/api/leaveApi';
import type { NewLeaveRequestInput } from '@/types';

export function useMyLeaves(employeeId: string | undefined) {
  return useQuery({
    queryKey: ['leaves', employeeId],
    queryFn: () => fetchLeavesForEmployee(employeeId!),
    enabled: !!employeeId,
  });
}

export function useLeaveBalances(employeeId: string | undefined) {
  return useQuery({
    queryKey: ['leaveBalances', employeeId],
    queryFn: () => fetchLeaveBalances(employeeId!),
    enabled: !!employeeId,
  });
}

export function useCreateLeaveRequest(employeeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewLeaveRequestInput) => createLeaveRequest(employeeId!, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['leaveBalances', employeeId] });
    },
  });
}
