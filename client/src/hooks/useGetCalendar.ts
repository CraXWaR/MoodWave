import { useEffect, useState } from "react";
import type { CalendarDay } from "../types/calendar.type.ts";
import { entriesService } from "../services/entries.service";

let calendarCache: CalendarDay[] | null = null;

export function invalidateCalendarCache() {
  calendarCache = null;
}

export function useGetCalendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>(calendarCache ?? []);
  const [isLoading, setIsLoading] = useState(!calendarCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (calendarCache) {
      setCalendar(calendarCache);
      setIsLoading(false);
      return;
    }

    entriesService
      .getCalendar()
      .then((result) => {
        calendarCache = result;
        setCalendar(result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { calendar, isLoading, error };
}
