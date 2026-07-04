import { format, parseISO, differenceInCalendarDays } from 'date-fns';

export function toIso(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplay(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy');
}

export function formatDisplayShort(iso: string): string {
  return format(parseISO(iso), 'd MMM');
}

export function todayIso(): string {
  return toIso(new Date());
}

export function dayCount(startIso: string, endIso: string): number {
  return differenceInCalendarDays(parseISO(endIso), parseISO(startIso)) + 1;
}

export function relativeFromToday(iso: string): string {
  const days = differenceInCalendarDays(parseISO(iso), new Date());
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 0) return `In ${days} days`;
  return `${Math.abs(days)} days ago`;
}
