import type { MoodEntry } from "../../../types/entry.type";
import { HistoryEntryRow } from "../HistoryEntryRow/HistoryEntryRow";
import { formatDayHeading } from "../../../utils/historyGrouping";

import styles from "./HistoryDayGroup.module.css";
import type { Mood } from "../../../types/mood.type";

interface HistoryDayGroupProps {
  dayEntries: MoodEntry[];
  moods: Mood[];
}

export function HistoryDayGroup({ dayEntries, moods }: HistoryDayGroupProps) {
  return (
    <section className={styles.day}>
      <h2 className={styles.heading}>{formatDayHeading(dayEntries[0].createdAt)}</h2>

      <ul className={styles.entries}>
        {dayEntries.map((entry) => (
          <HistoryEntryRow key={entry.id} entry={entry} moods={moods} />
        ))}
      </ul>
    </section>
  );
}
