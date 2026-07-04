import type { Announcement } from '@/types';
import announcementsData from './mockData/announcements.json';
import { withLatency } from './fakeNetwork';

const announcements = announcementsData as Announcement[];

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const sorted = [...announcements].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority === 'high' ? -1 : 1;
    return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
  });
  return withLatency(sorted);
}
