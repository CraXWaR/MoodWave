import { useState } from "react";

import { entriesService } from "../services/entries.service";
import { invalidateCalendarCache } from "./useGetCalendar";
import { invalidateMoodsCache } from "./useMoods";

interface UseCheckInOptions {
  onSuccess?: () => void;
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
      await entriesService.create({ mood, note: note.trim() || undefined });
      setMood(null);

      // clear the caches so that the next fetch will get new data
      invalidateCalendarCache();
      invalidateMoodsCache();

      setNote("");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { mood, setMood, note, setNote, error, isSubmitting, handleSubmit };
}
