import type { Mood } from "../../../types/mood.type";
import type { SensedStatus } from "../../../types/entry.type";
import { moodChannelStyle } from "./subComponents/moodChannelStyle";
import { pendingMessage } from "./subComponents/pendingMessage";

import styles from "./SensedReading.module.css";

interface SensedReadingProps {
  loggedMood: Mood | undefined;
  sensedMood: Mood | undefined;
  status: SensedStatus;
}

export function SensedReading({ loggedMood, sensedMood, status }: SensedReadingProps) {
  const hasSensedMood = status === "sensed" && sensedMood !== undefined;

  return (
    <div className={styles.reading} aria-live="polite">
      <div className={styles.channel} style={moodChannelStyle(loggedMood)}>
        <span className={styles.channelLabel}>You logged</span>
        <span className={styles.channelValue}>
          <span aria-hidden="true">{loggedMood?.emoji}</span> {loggedMood?.label}
        </span>
      </div>

      <div className={styles.channel} style={hasSensedMood ? moodChannelStyle(sensedMood) : undefined}>
        <span className={styles.channelLabel}>AI sensed</span>
        {hasSensedMood ? (
          <span className={styles.channelValue}>
            <span aria-hidden="true">{sensedMood.emoji}</span> {sensedMood.label}
          </span>
        ) : (
          <span className={status === "reading" ? styles.pending : styles.muted}>{pendingMessage(status)}</span>
        )}
      </div>
    </div>
  );
}
