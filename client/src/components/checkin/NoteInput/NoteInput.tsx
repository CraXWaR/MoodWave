import styles from "./NoteInput.module.css";

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NoteInput({ value, onChange }: NoteInputProps) {
  return (
    <textarea
      className={styles.note}
      placeholder="Anything on your mind? (optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
    />
  );
}