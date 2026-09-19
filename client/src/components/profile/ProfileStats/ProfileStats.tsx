import styles from "./ProfileStats.module.css";

interface ProfileStatsProps {
  streak: number;
  totalEntries: number;
  topMood: { emoji: string; label: string } | null;
}

export function ProfileStats({ streak, totalEntries, topMood }: ProfileStatsProps) {
  return (
    <ul className={styles.stats}>
      <li className={styles.stat}>
        <span className={styles.value}>🔥 {streak}</span>
        <span className={styles.label}>Day streak</span>
      </li>
      <li className={styles.stat}>
        <span className={styles.value}>{totalEntries}</span>
        <span className={styles.label}>Entries</span>
      </li>
      <li className={styles.stat}>
        <span className={styles.value}>{topMood ? topMood.emoji : "—"}</span>
        <span className={styles.label}>{topMood ? `Mostly ${topMood.label}` : "Top mood"}</span>
      </li>
    </ul>
  );
}
