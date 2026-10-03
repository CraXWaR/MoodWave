import { useEffect, useState } from "react";
import { entriesService } from "../services/entries.service";
import type { EntryStatsResponse } from "../types/entry.type";
import { useStreak } from "./useStreak";

interface ProfileStatsData extends EntryStatsResponse {
  streak: number;
}

export function useProfileStats(refreshKey = 0) {
  const { streak, isLoading: streakLoading, error: streakError } = useStreak(refreshKey);
  const [entryStats, setEntryStats] = useState<EntryStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    entriesService
      .getStats()
      .then((data) => {
        if (!cancelled) setEntryStats(data);
      })
      .catch(() => {
        if (!cancelled) setStatsError("Couldn't load your stats.");
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const stats: ProfileStatsData | null = entryStats && streak !== null ? { ...entryStats, streak } : null;

  return {
    stats,
    loading: statsLoading || streakLoading,
    error: statsError ?? streakError,
  };
}
