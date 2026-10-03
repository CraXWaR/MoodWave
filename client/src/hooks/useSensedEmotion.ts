import { useEffect, useState } from "react";
import { entriesService } from "../services/entries.service";
import type { MoodEntry, SensedStatus } from "../types/entry.type";

interface SensedResult {
  entryId: string;
  emotionToken: string | null;
}

const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 4;

// The server reads the note with AI after the entry is saved (fire-and-forget),
// so poll the newest entry until its aiEmotion shows up or we give up.
export function useSensedEmotion(entry: MoodEntry | null) {
  const [result, setResult] = useState<SensedResult | null>(null);

  useEffect(() => {
    if (!entry?.note) return;

    const entryId = entry.id;
    let attempts = 0;
    let isFinished = false;

    const finish = (emotionToken: string | null) => {
      isFinished = true;
      window.clearInterval(timer);
      setResult({ entryId, emotionToken });
    };

    const timer = window.setInterval(async () => {
      attempts += 1;
      try {
        const { entries } = await entriesService.list({ limit: 1, offset: 0 });
        const latestEntry = entries[0];
        if (isFinished) return;
        if (latestEntry?.id === entryId && latestEntry.aiEmotion) {
          finish(latestEntry.aiEmotion);
          return;
        }
      } catch {
        // ponytail: a failed poll just uses up an attempt
      }
      if (!isFinished && attempts >= MAX_POLL_ATTEMPTS) finish(null);
    }, POLL_INTERVAL_MS);

    return () => {
      isFinished = true;
      window.clearInterval(timer);
    };
  }, [entry]);

  const currentResult = entry && result?.entryId === entry.id ? result : null;

  let status: SensedStatus = "idle";
  if (entry?.note) {
    if (!currentResult) status = "reading";
    else status = currentResult.emotionToken ? "sensed" : "unclear";
  }

  return { status, emotionToken: currentResult?.emotionToken ?? null };
}
