import { Sparkles } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnnouncementCard } from '@/components/announcements/AnnouncementCard';
import { EmptyState, ErrorState, Skeleton } from '@/components/common/States';
import { Button } from '@/components/common/Button';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useAnnouncementSummary } from '@/hooks/useAnnouncementSummary';

export function AnnouncementsPage() {
  const { data: announcements, isLoading, isError, refetch } = useAnnouncements();
  const { summaries, summarize } = useAnnouncementSummary();

  const summarizeAll = () => {
    announcements?.forEach((a) => summarize(a.id, a.title, a.body));
  };

  return (
    <DashboardLayout title="Announcements" subtitle="Everything the company wants you to know">
      <div className="space-y-5">
        {announcements && announcements.length > 0 && (
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={summarizeAll}>
              <Sparkles className="size-3.5" />
              Summarize all with AI
            </Button>
          </div>
        )}

        {isError ? (
          <ErrorState
            title="Couldn't load announcements"
            description="Something went wrong while fetching the latest updates."
            action={
              <Button size="sm" variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : announcements && announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((a) => (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                summary={summaries[a.id]}
                onSummarize={() => summarize(a.id, a.title, a.body)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No announcements right now" description="Check back later for company updates." />
        )}
      </div>
    </DashboardLayout>
  );
}
