import { Link } from "react-router-dom";
import { useEntryHistory } from "../../hooks/useEntryHistory";

import CheckInForm from "../../components/checkin/CheckInForm/CheckInForm";

import styles from "./HomePage.module.css";
import { MOCK_MOODS } from "../../services/mood.type";

export default function HomePage() {
  const { entries, loading, error, hasMore, loadMore, refetch } = useEntryHistory();

  const recentEntries = entries.slice(0, 5);

  return (
    <div className={styles.page}>
      <section className={styles.checkInPrompt}>
        <CheckInForm onSuccess={refetch} title="How are you feeling today?" />
      </section>

      <section className={styles.recent}>
        <h2>Recent entries</h2>

        {loading && entries.length === 0 && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && recentEntries.length === 0 && (
          <p className={styles.empty}>No entries yet — log your first mood above.</p>
        )}

        <ul className={styles.entryList}>
          {recentEntries.map((entry) => (
            <li key={entry.id} className={styles.entryItem} data-mood={entry.mood}>
              <div className={styles.entryMeta}>
                <span className={styles.entryDate}>{new Date(entry.createdAt).toLocaleDateString()}</span>
                <span className={styles.entryMoodLabel}>{MOCK_MOODS.find((m) => m.value === entry.mood)?.label}</span>
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
