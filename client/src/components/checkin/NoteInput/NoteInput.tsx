import styles from "./NoteInput.module.css";

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function NoteInput({ value, onChange, id }: NoteInputProps) {
  return (
    <textarea
      name="note"
      id={id}
      className={styles.note}
      placeholder="Anything on your mind? (optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
    />
  );
}
