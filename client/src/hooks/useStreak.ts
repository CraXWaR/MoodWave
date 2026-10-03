import { useEffect, useState } from "react";
import { entriesService } from "../services/entries.service";

interface UseStreakResult {
  streak: number | null;
  isLoading: boolean;
  error: string | null;
}

export function useStreak(refreshKey = 0): UseStreakResult {
  const [streak, setStreak] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    entriesService
      .getStreak()
      .then((res) => setStreak(res.streak))
      .catch(() => setError("Failed to load streak"))
      .finally(() => setIsLoading(false));
  }, [refreshKey]);

  return { streak, isLoading, error };
}
