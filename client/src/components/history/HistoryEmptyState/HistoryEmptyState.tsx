import styles from './HistoryEmptyState.module.css';

export function HistoryEmptyState() {
  return (
    <div className={styles.state}>
      <span className={styles.emoji} aria-hidden="true">🌱</span>
      <p className={styles.title}>No check-ins yet</p>
      <p className={styles.subtitle}>
        Log your first mood above and it will show up here.
      </p>
    </div>
  );
}
