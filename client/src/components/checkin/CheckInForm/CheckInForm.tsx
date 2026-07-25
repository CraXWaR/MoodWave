import { useCheckIn } from "../../../hooks/useCheckIn";

import { MoodPicker } from "../MoodPicker/MoodPicker";
import { NoteInput } from "../NoteInput/NoteInput";
import { Button } from "../../ui/Button/Button";

import styles from "./CheckInForm.module.css";

interface CheckInFormProps {
  onSuccess?: () => void;
  title?: string;
}

export default function CheckInForm({ onSuccess, title = "How are you feeling?" }: CheckInFormProps) {
  const { mood, setMood, note, setNote, error, isSubmitting, handleSubmit } = useCheckIn({ onSuccess });

  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MoodPicker value={mood} onChange={setMood} />
        <NoteInput value={note} onChange={setNote} id="note" />

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Save check-in
        </Button>
      </form>
    </div>
  );
}
