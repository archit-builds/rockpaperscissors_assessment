export type AnnouncementPriority = 'normal' | 'high';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  postedBy: string;
  department: string;
  postedOn: string; // ISO date
  priority: AnnouncementPriority;
}
