import { useMemo } from "react";

import { useEntryHistory } from "../../hooks/useEntryHistory";
import { groupByDay } from "../../utils/historyGrouping";
import { HistoryHeader } from "../../components/history/HistoryHeader/HistoryHeader";
import { HistoryEmptyState } from "../../components/history/HistoryEmptyState/HistoryEmptyState";
import { HistoryDayGroup } from "../../components/history/HistoryDayGroup/HistoryDayGroup";
import { Button } from "../../components/ui/Button/Button";
import { LoadingState } from "../../components/ui/LoadingState/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState/ErrorState";

import styles from "./HistoryPage.module.css";
import { useGetMoods } from "../../hooks/useMoods";

export default function HistoryPage() {
  const {
    entries,
    total,
    loading: entriesLoading,
    error: entriesError,
    loadMore,
    hasMore,
    refetch,
  } = useEntryHistory();
  const { moods, loading: moodsLoading, error: moodsError } = useGetMoods();

  const grouped = useMemo(() => groupByDay(entries), [entries]);

  if (moodsLoading) {
    return <LoadingState message="Loading your moods…" />;
  }
  if (moodsError) {
    return <ErrorState message={moodsError} onRetry={refetch} />;
  }

  return (
    <div className={styles.page}>
      <HistoryHeader total={total} />

      {entriesError && <ErrorState message={entriesError} onRetry={refetch} />}
      {!entriesError && entriesLoading && entries.length === 0 && <LoadingState message="Loading your history…" />}
      {!entriesError && !entriesLoading && entries.length === 0 && <HistoryEmptyState />}

      <div className={styles.list}>
        {grouped.map(([dayKey, dayEntries]) => (
          <HistoryDayGroup key={dayKey} dayEntries={dayEntries} moods={moods} />
        ))}
      </div>

      {hasMore && (
        <Button variant="ghost" isLoading={entriesLoading} onClick={loadMore} className={styles.loadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}
