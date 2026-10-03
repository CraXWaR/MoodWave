import { useCheckIn } from "../../../hooks/useCheckIn";
import type { Mood } from "../../../types/mood.type";
import type { MoodEntry } from "../../../types/entry.type";

import { MoodPicker } from "../MoodPicker/MoodPicker";
import { NoteInput } from "../NoteInput/NoteInput";
import { Button } from "../../ui/Button/Button";

import styles from "./CheckInForm.module.css";

interface CheckInFormProps {
  moods: Mood[];
  onSuccess?: (entry: MoodEntry) => void;
  title?: string;
}

export function CheckInForm({moods, onSuccess, title = "How are you feeling?" }: CheckInFormProps) {
  const { mood, setMood, note, setNote, error, isSubmitting, handleSubmit } = useCheckIn({ onSuccess });

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MoodPicker moods={moods} value={mood} onChange={setMood} />
        <NoteInput value={note} onChange={setNote} id="note" />

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Save check-in
        </Button>
      </form>
    </div>
  );
}
