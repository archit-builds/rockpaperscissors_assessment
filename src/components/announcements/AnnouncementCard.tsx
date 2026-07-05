import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, User2 } from 'lucide-react';
import type { Announcement } from '@/types';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { formatDisplay, relativeFromToday } from '@/lib/date';
import { cn } from '@/lib/cn';

interface AnnouncementCardProps {
  announcement: Announcement;
  summary?: { text: string | null; loading: boolean; error: string | null };
  onSummarize: () => void;
}

export function AnnouncementCard({ announcement, summary, onSummarize }: AnnouncementCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = announcement.body.length > 260;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[14px] font-semibold text-text dark:text-text-dark">{announcement.title}</h3>
            {announcement.priority === 'high' && (
              <Badge tone="amber" dot>
                Priority
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted dark:text-muted-dark">
            <User2 className="size-3.5" />
            <span>{announcement.postedBy}</span>
            <span>·</span>
            <span>{announcement.department}</span>
            <span>·</span>
            <span>{relativeFromToday(announcement.postedOn)}</span>
          </div>
        </div>
      </div>

      {/* AI summary panel */}
      <div className="mt-3">
        {summary?.text ? (
          <div className="flex gap-2 rounded-md border border-accent-500/25 bg-accent-50 px-3 py-2.5 dark:bg-accent-500/10">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-accent-600 dark:text-accent-400" />
            <p className="text-[13px] leading-snug text-text dark:text-text-dark">{summary.text}</p>
          </div>
        ) : summary?.error ? (
          <div className="flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2.5 text-[12.5px] text-muted dark:border-line-dark dark:bg-ink-800 dark:text-muted-dark">
            {summary.error}
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={onSummarize}
            loading={summary?.loading}
            disabled={summary?.loading}
          >
            {summary?.loading ? (
              'Summarizing…'
            ) : (
              <>
                <Sparkles className="size-3.5" />
                Summarize with AI
              </>
            )}
          </Button>
        )}
      </div>

      <p className={cn('mt-3 text-[13px] leading-relaxed text-muted dark:text-muted-dark', !expanded && isLong && 'line-clamp-3')}>
        {announcement.body}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-accent-600 hover:underline dark:text-accent-400"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="size-3.5" />
            </>
          ) : (
            <>
              Read full announcement <ChevronDown className="size-3.5" />
            </>
          )}
        </button>
      )}

      <p className="mt-3 border-t border-line pt-2 text-[11px] text-muted/70 dark:border-line-dark dark:text-muted-dark/60">
        Posted {formatDisplay(announcement.postedOn)}
      </p>
    </Card>
  );
}
