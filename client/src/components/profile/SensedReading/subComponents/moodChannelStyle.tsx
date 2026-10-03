import type { CSSProperties } from "react";
import type { Mood } from "../../../../types/mood.type";

export function moodChannelStyle(mood: Mood | undefined): CSSProperties | undefined {
  if (!mood) return undefined;
  return {
    "--channel-accent": `var(--mood-${mood.token})`,
    "--channel-soft": `var(--mood-${mood.token}-soft)`,
    "--channel-text": `var(--mood-${mood.token}-text)`,
  } as CSSProperties;
}
