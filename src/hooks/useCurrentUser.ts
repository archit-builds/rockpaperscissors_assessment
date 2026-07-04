import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/api/employeeApi';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  });
}
