import { useState } from "react";

import { entriesService } from "../services/entries.service";
import type { MoodEntry } from "../types/entry.type";
import { invalidateCalendarCache } from "./useGetCalendar";
import { invalidateMoodsCache } from "./useMoods";

interface UseCheckInOptions {
  onSuccess?: (entry: MoodEntry) => void;
}

export function useCheckIn({ onSuccess }: UseCheckInOptions = {}) {
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mood === null) {
      setError("Pick a mood before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const entry = await entriesService.create({ mood, note: note.trim() || undefined });
      setMood(null);

      // clear the caches so that the next fetch will get new data
      invalidateCalendarCache();
      invalidateMoodsCache();

      setNote("");
      onSuccess?.(entry);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { mood, setMood, note, setNote, error, isSubmitting, handleSubmit };
}
