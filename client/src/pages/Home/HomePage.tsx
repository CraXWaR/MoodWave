import { Link } from "react-router-dom";
import { useEntryHistory } from "../../hooks/useEntryHistory";
import { useGetMoods } from "../../hooks/useMoods";

import { CheckInForm } from "../../components/checkin/CheckInForm/CheckInForm";
import { LoadingState } from "../../components/ui/LoadingState/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState/ErrorState";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { entries, loading: entriesLoading, error: entriesError, refetch: refetchEntries } = useEntryHistory();
  const { moods, loading: moodsLoading, error: moodsError, refetch: refetchMoods } = useGetMoods();

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

        {entriesLoading && entries.length === 0 && <LoadingState message="Loading your recent entries…" />}
        {entriesError && <ErrorState message={entriesError} onRetry={refetchEntries} />}

        {!entriesLoading && !entriesError && recentEntries.length === 0 && (
          <p className={styles.empty}>No entries yet — log your first mood above.</p>
        )}

        <ul className={styles.entryList}>
          {recentEntries.map((entry) => (
            <li key={entry.id} className={styles.entryItem} data-mood={entry.mood}>
              <div className={styles.entryMeta}>
                <span className={styles.entryDate}>{new Date(entry.createdAt).toLocaleDateString()}</span>
                <span className={styles.entryMoodLabel}>{moods.find((mood) => mood.value === entry.mood)?.label}</span>
              </div>
              {entry.note && <p className={styles.entryNote}>{entry.note}</p>}
            </li>
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
