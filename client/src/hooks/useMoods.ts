import { useCallback, useEffect, useState } from "react";
import type { Mood } from "../types/mood.type";
import { moodsService } from "../services/mood.service";

import { SIMULATE_STATES } from "../utils/constants";

let moodsCache: Mood[] | null = null;

export function invalidateMoodsCache() {
  moodsCache = null;
}

export function useGetMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoods = useCallback(async () => {
    if (moodsCache) {
      setMoods(moodsCache);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (SIMULATE_STATES.delay) await new Promise((r) => setTimeout(r, SIMULATE_STATES.delay));
      if (SIMULATE_STATES.forceError) throw new Error("Simulated failure for testing");

      const result = await moodsService.list();
      moodsCache = result;
      setMoods(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load moods");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  return { moods, loading, error, refetch: fetchMoods };
}
