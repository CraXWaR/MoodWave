import { useEffect, useState } from "react";
import type { CalendarDay } from "../types/calendar.type.ts";
import { entriesService } from "../services/entries.service";

export function useGetCalendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    entriesService
      .getCalendar()
      .then(setCalendar)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { calendar, isLoading, error };
}
