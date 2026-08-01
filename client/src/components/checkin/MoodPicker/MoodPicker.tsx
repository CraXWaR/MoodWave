import type { Mood } from "../../../types/mood.type";

import styles from "./MoodPicker.module.css";

interface MoodPickerProps {
  moods: Mood[];
  value: number | null;
  onChange: (value: number) => void;
}

export function MoodPicker({moods, value, onChange }: MoodPickerProps) {
  return (
    <div className={styles.picker}>
      {moods.map(({ value: moodValue, emoji, label }) => (
        <button
          key={moodValue}
          type="button"
          data-mood={moodValue}
          data-label={label}
          className={value === moodValue ? styles.selected : styles.option}
          onClick={() => onChange(moodValue)}
          aria-pressed={value === moodValue}
          aria-label={label}
        >
          <span aria-hidden="true">{emoji}</span>
        </button>
      ))}
    </div>
  );
}
