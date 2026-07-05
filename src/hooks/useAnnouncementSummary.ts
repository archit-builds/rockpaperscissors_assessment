import { useState, useCallback } from 'react';
import { summarizeAnnouncement } from '@/lib/groqClient';

interface SummaryState {
  text: string | null;
  loading: boolean;
  error: string | null;
}

export function useAnnouncementSummary() {
  const [cache, setCache] = useState<Record<string, SummaryState>>({});

  const summarize = useCallback(
    async (id: string, title: string, body: string) => {
      // Already have a summary or one is in flight — don't re-call the API.
      if (cache[id]?.text || cache[id]?.loading) return;

      setCache((prev) => ({ ...prev, [id]: { text: null, loading: true, error: null } }));

      try {
        const summary = await summarizeAnnouncement(title, body);
        setCache((prev) => ({ ...prev, [id]: { text: summary, loading: false, error: null } }));
      } catch (err) {
        setCache((prev) => ({
          ...prev,
          [id]: { text: null, loading: false, error: err instanceof Error ? err.message : 'Summary unavailable' },
        }));
      }
    },
    [cache]
  );

  return { summaries: cache, summarize };
}
