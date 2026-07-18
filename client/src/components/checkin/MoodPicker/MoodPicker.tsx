import { MOCK_MOODS } from "../../../services/mood.type";

import styles from "./MoodPicker.module.css";

interface MoodPickerProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className={styles.picker}>
      {MOCK_MOODS.map(({ value: moodValue, emoji, label }) => (
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
