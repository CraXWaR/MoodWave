import { useEffect, useState } from "react";
import type { Mood } from "../../../types/mood.type";
import type { MoodEntry } from "../../../types/entry.type";
import { useSensedEmotion } from "../../../hooks/useSensedEmotion";

import { CheckInForm } from "../../checkin/CheckInForm/CheckInForm";
import { SensedReading } from "../SensedReading/SensedReading";

import styles from "./CheckInCard.module.css";

interface CheckInCardProps {
  moods: Mood[];
  onSaved: () => void;
  onSensed: () => void;
}

export function CheckInCard({ moods, onSaved, onSensed }: CheckInCardProps) {
  const [savedEntry, setSavedEntry] = useState<MoodEntry | null>(null);
  const { status, emotionToken } = useSensedEmotion(savedEntry);

  useEffect(() => {
    if (status === "sensed") onSensed();
  }, [status, onSensed]);

  const handleSaved = (entry: MoodEntry) => {
    setSavedEntry(entry);
    onSaved();
  };

  const loggedMood = savedEntry ? moods.find((mood) => mood.value === savedEntry.mood) : undefined;
  const sensedMood = emotionToken ? moods.find((mood) => mood.token === emotionToken) : undefined;

  return (
    <section className={styles.card}>
      <CheckInForm moods={moods} onSuccess={handleSaved} />
      {savedEntry && <SensedReading loggedMood={loggedMood} sensedMood={sensedMood} status={status} />}
    </section>
  );
}
