
import type { MoodEntry } from "../../../types/entry.type";
import { MOCK_MOODS } from "../../../utils/constants";

import styles from './HistoryEntryRow.module.css';

interface HistoryEntryRowProps {
  entry: MoodEntry;
}

export function HistoryEntryRow({ entry }: HistoryEntryRowProps) {
  const mood = MOCK_MOODS.find((mood) => mood.value === entry.mood);
  const token = mood?.token ?? 'burnout';

  return (
    <li
      className={styles.entry}
      style={
        {
          '--entry-accent': `var(--mood-${token})`,
          '--entry-accent-text': `var(--mood-${token}-text)`,
          '--entry-accent-soft': `var(--mood-${token}-soft)`,
        } as React.CSSProperties
      }
    >
      <div className={styles.time}>
        {new Date(entry.createdAt).toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: '2-digit',
        })}
      </div>

      <div className={styles.body}>
        <div className={styles.moodRow}>
          <span className={styles.emoji}>{mood?.emoji}</span>
          <span className={styles.label}>{mood?.label}</span>
        </div>
        {entry.note && <p className={styles.note}>{entry.note}</p>}
      </div>
    </li>
  );
}