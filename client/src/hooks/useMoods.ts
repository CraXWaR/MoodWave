import { useCallback, useEffect, useState } from "react";
import type { Mood } from "../types/mood.type";
import { moodsService } from "../services/mood.service";

import { SIMULATE_STATES } from "../utils/constants";

let moodsCache: Mood[] | null = null;

export function invalidateMoodsCache() {
  moodsCache = null;
}

async function requestMoods(): Promise<Mood[]> {
  if (SIMULATE_STATES.delay) await new Promise((r) => setTimeout(r, SIMULATE_STATES.delay));
  if (SIMULATE_STATES.forceError) throw new Error("Simulated failure for testing");

  const result = await moodsService.list();
  moodsCache = result;
  return result;
}

export function useGetMoods() {
  const [moods, setMoods] = useState<Mood[]>(moodsCache ?? []);
  const [loading, setLoading] = useState(!moodsCache);
  const [error, setError] = useState<string | null>(null);

  const loadMoods = useCallback(
    () =>
      requestMoods()
        .then(setMoods)
        .catch((err) => setError(err instanceof Error ? err.message : "Failed to load moods"))
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    if (moodsCache) return;
    loadMoods();
  }, [loadMoods]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return loadMoods();
  }, [loadMoods]);

  return { moods, loading, error, refetch };
}
