import { useMemo } from "react";

import { useEntryHistory } from "../../hooks/useEntryHistory";
import { groupByDay } from "../../utils/historyGrouping";
import { HistoryHeader } from "../../components/history/HistoryHeader/HistoryHeader";
import { HistoryEmptyState } from "../../components/history/HistoryEmptyState/HistoryEmptyState";
import { HistoryDayGroup } from "../../components/history/HistoryDayGroup/HistoryDayGroup";
import { Button } from "../../components/ui/Button/Button";

import styles from "./HistoryPage.module.css";

export default function HistoryPage() {
  const { entries, total, loading, error, loadMore, hasMore } = useEntryHistory();

  const grouped = useMemo(() => groupByDay(entries), [entries]);

  return (
    <div className={styles.page}>
      <HistoryHeader total={total} />

      {error && <div className={styles.state}>Couldn't load your history. Try refreshing.</div>}

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
