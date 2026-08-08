import type { MoodEntry } from "../../../types/entry.type";
import type { Mood } from "../../../types/mood.type";

import styles from "./HistoryEntryRow.module.css";

interface HistoryEntryRowProps {
  entry: MoodEntry;
  moods: Mood[];
}

export function HistoryEntryRow({ entry, moods }: HistoryEntryRowProps) {
  const mood = moods.find((mood) => mood.value === entry.mood);
  const token = mood?.token ?? "burnout";

  const aiMood = entry.aiEmotion ? moods.find((mood) => mood.token === entry.aiEmotion) : undefined;

  return (
    <li
      className={styles.entry}
      style={
        {
          "--entry-accent": `var(--mood-${token})`,
          "--entry-accent-text": `var(--mood-${token}-text)`,
          "--entry-accent-soft": `var(--mood-${token}-soft)`,
        } as React.CSSProperties
      }
    >
      <div className={styles.time}>
        {new Date(entry.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}{" "}
        {new Date(entry.createdAt).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>

      <div className={styles.body}>
        <div className={styles.moodRow}>
          <div>
            <span className={styles.emoji}>{mood?.emoji}</span>
            <span className={styles.label}>{mood?.label}</span>
          </div>

          {aiMood && (
            <span className={styles.aiBadge}>
              <span className={styles.aiEmoji}>{aiMood.emoji}</span>
              <span className={styles.aiLabel}>AI sensed: {aiMood.label}</span>
            </span>
          )}
        </div>
        {entry.note && <p className={styles.note}>{entry.note}</p>}
      </div>
    </li>
  );
}
