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

export default function HistoryPage() {
  const { entries, total, loading, error, loadMore, hasMore, refetch } = useEntryHistory();

  const grouped = useMemo(() => groupByDay(entries), [entries]);

  return (
    <div className={styles.page}>
      <HistoryHeader total={total} />

      {error && <ErrorState message={error} onRetry={refetch} />}
      {!error && loading && entries.length === 0 && <LoadingState message="Loading your history…" />}
      {!error && !loading && entries.length === 0 && <HistoryEmptyState />}

      <div className={styles.list}>
        {grouped.map(([dayKey, dayEntries]) => (
          <HistoryDayGroup key={dayKey} dayEntries={dayEntries} />
        ))}
      </div>

      {hasMore && (
        <Button variant="ghost" isLoading={loading} onClick={loadMore} className={styles.loadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}
