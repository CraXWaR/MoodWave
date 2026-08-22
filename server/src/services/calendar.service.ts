import { CalendarDay } from "../types/calendar.interface";

interface CalendarEntry {
  createdAt: Date;
  mood: number;
}

export class CalendarService {
  getCalendar(entries: CalendarEntry[]): CalendarDay[] {
    const buckets = new Map<string, { total: number; count: number }>();

    for (const entry of entries) {
      const key = this.toDayKey(entry.createdAt);
      const existing = buckets.get(key);

      if (existing) {
        existing.total += entry.mood;
        existing.count += 1;
      } else {
        buckets.set(key, { total: entry.mood, count: 1 });
      }
    }

    return Array.from(buckets.entries())
      .map(([date, { total, count }]) => ({
        date,
        mood: Math.round((total / count) * 10) / 10,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private toDayKey(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
}

