import styles from "./MoodWave.module.css";

const MOODS = [
  { key: "joy", label: "Joyful" },
  { key: "calm", label: "Calm" },
  { key: "sad", label: "Sad" },
  { key: "anxious", label: "Anxious" },
  { key: "stressed", label: "Stressed" },
  { key: "burnout", label: "Burnt out" },
] as const;

export default function MoodWave() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.bars}>
        {MOODS.map((mood, i) => (
          <span
            key={mood.key}
            className={styles.bar}
            style={{
              ["--mood-color" as any]: `var(--mood-${mood.key})`,
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.labels}>
        {MOODS.map((mood) => (
          <span key={mood.key} className={styles.label}>
            {mood.label}
          </span>
        ))}
      </div>
    </div>
  );
}
