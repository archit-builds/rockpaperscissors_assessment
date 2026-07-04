import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncements } from '@/api/announcementApi';

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });
}
