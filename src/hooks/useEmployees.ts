import { useQuery } from '@tanstack/react-query';
import { fetchEmployees, type EmployeeQuery } from '@/api/employeeApi';

export function useEmployees(query: EmployeeQuery) {
  return useQuery({
    queryKey: ['employees', query],
    queryFn: () => fetchEmployees(query),
    placeholderData: (prev) => prev,
  });
}
