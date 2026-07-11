import styles from "./MoodPicker.module.css";

//TODO: Fetch MOODS from DB
const MOODS = [
  { value: 1, emoji: "😞", label: "Terrible" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😄", label: "Great" },
];

interface MoodPickerProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className={styles.picker}>
      {MOODS.map(({ value: moodValue, emoji, label }) => (
        <button
          key={moodValue}
          type="button"
          data-mood={moodValue}
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
