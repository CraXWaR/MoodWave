import { useCheckIn } from "../../hooks/useCheckIn";

import MoodPicker from "../../components/checkin/MoodPicker/MoodPicker";
import NoteInput from "../../components/checkin/NoteInput/NoteInput";
import Button from "../../components/ui/Button/Button";

import styles from "./CheckInPage.module.css";

export default function CheckInPage() {
  const { mood, setMood, note, setNote, error, isSubmitting, handleSubmit } = useCheckIn();

  return (
    <div className={styles.page}>
      <h1>How are you feeling?</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MoodPicker value={mood} onChange={setMood} />
        <NoteInput value={note} onChange={setNote} />

        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Save check-in
        </Button>
      </form>
    </div>
  );
}
