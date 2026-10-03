import { useMemo } from "react";
import type { MoodEntry } from "../../../types/entry.type";
import type { Mood } from "../../../types/mood.type";
import { groupByDay } from "../../../utils/historyGrouping";

import { HistoryHeader } from "../../history/HistoryHeader/HistoryHeader";
import { HistoryEmptyState } from "../../history/HistoryEmptyState/HistoryEmptyState";
import { HistoryDayGroup } from "../../history/HistoryDayGroup/HistoryDayGroup";
import { Button } from "../../ui/Button/Button";
import { LoadingState } from "../../ui/LoadingState/LoadingState";
import { ErrorState } from "../../ui/ErrorState/ErrorState";

import styles from "./MoodHistory.module.css";

interface MoodHistoryProps {
  entries: MoodEntry[];
  total: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  moods: Mood[];
  onLoadMore: () => void;
  onRetry: () => void;
}

export function MoodHistory({
  entries,
  total,
  loading,
  error,
  hasMore,
  moods,
  onLoadMore,
  onRetry,
}: MoodHistoryProps) {
  const grouped = useMemo(() => groupByDay(entries), [entries]);

  return (
    <section className={styles.section}>
      <HistoryHeader total={total} />

      {error && <ErrorState message={error} onRetry={onRetry} />}
      {!error && loading && entries.length === 0 && <LoadingState message="Loading your history…" />}
      {!error && !loading && entries.length === 0 && <HistoryEmptyState />}

      <div className={styles.list}>
        {grouped.map(([dayKey, dayEntries]) => (
          <HistoryDayGroup key={dayKey} dayEntries={dayEntries} moods={moods} />
        ))}
      </div>

      {hasMore && (
        <Button variant="ghost" isLoading={loading} onClick={onLoadMore} className={styles.loadMore}>
          Load more
        </Button>
      )}
    </section>
  );
}
