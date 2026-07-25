import { useState, useEffect, useCallback } from "react";
import { entriesService } from "../services/entries.service";
import type { MoodEntry } from "../types/entry.type";

import { SIMULATE_STATES } from "../utils/constants";

const PAGE_SIZE = 10;

export function useEntryHistory() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (targetOffset: number) => {
    setLoading(true);
    setError(null);
    try {
      if (SIMULATE_STATES.delay) await new Promise((r) => setTimeout(r, SIMULATE_STATES.delay));
      if (SIMULATE_STATES.forceError) throw new Error("Simulated failure for testing");

      const result = await entriesService.list({ limit: PAGE_SIZE, offset: targetOffset });
      setEntries((prev) => (targetOffset === 0 ? result.entries : [...prev, ...result.entries]));
      setTotal(result.total);
      setOffset(targetOffset);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load entries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  const hasMore = entries.length < total;
  const loadMore = () => fetchPage(offset + PAGE_SIZE);

  return { entries, total, loading, error, hasMore, loadMore, refetch: () => fetchPage(0) };
}
