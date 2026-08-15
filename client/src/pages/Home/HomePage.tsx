import { Link } from "react-router-dom";
import { useEntryHistory } from "../../hooks/useEntryHistory";
import { useGetMoods } from "../../hooks/useMoods";
import { useStreak } from "../../hooks/useStreak";

import { CheckInForm } from "../../components/checkin/CheckInForm/CheckInForm";
import { LoadingState } from "../../components/ui/LoadingState/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState/ErrorState";
import { HistoryEntryRow } from "../../components/history/HistoryEntryRow/HistoryEntryRow";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { entries, loading: entriesLoading, error: entriesError, refetch: refetchEntries } = useEntryHistory();
  const { moods, loading: moodsLoading, error: moodsError, refetch: refetchMoods } = useGetMoods();
  const { streak, isLoading: streakLoading, error: streakError } = useStreak();

  const recentEntries = entries.slice(0, 5);

  if (moodsLoading) {
    return <LoadingState message="Loading your moods…" />;
  }
  if (moodsError) {
    return <ErrorState message={moodsError} onRetry={refetchMoods} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.checkInPrompt}>
        <CheckInForm moods={moods} onSuccess={refetchEntries} title="How are you feeling today?" />
      </section>

      <section className={styles.recent}>
        <h2>Recent entries</h2>

        {!streakLoading && !streakError && streak !== null && streak > 0 && (
          <div className={styles.streakBadge}>
            🔥 <span>{streak} day streak</span>
          </div>
        )}

        {entriesLoading && entries.length === 0 && <LoadingState message="Loading your recent entries…" />}
        {entriesError && <ErrorState message={entriesError} onRetry={refetchEntries} />}

        {!entriesLoading && !entriesError && recentEntries.length === 0 && (
          <p className={styles.empty}>No entries yet — log your first mood above.</p>
        )}

        <ul className={styles.entryList}>
          {recentEntries.map((entry) => (
            <HistoryEntryRow key={entry.id} entry={entry} moods={moods} />
          ))}
        </ul>

        {entries.length > 0 && (
          <Link to="/history" className={styles.viewAll}>
            View full history
          </Link>
        )}
      </section>
    </div>
  );
}
