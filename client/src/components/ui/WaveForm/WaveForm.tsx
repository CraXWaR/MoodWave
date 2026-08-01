import { SPECTRUM_VARS } from "../../../utils/constants";

import styles from "./WaveForm.module.css";

interface WaveformProps {
  variant?: "hero" | "divider";
}

const VARIANT_CLASS: Record<"hero" | "divider", string> = {
  hero: styles.heroWave,
  divider: styles.divider,
};

export function WaveForm({ variant = "hero" }: WaveformProps) {
  return (
    <div className={`${styles.waveform} ${VARIANT_CLASS[variant]}`} aria-hidden="true">
      {SPECTRUM_VARS.map((color, i) => (
        <span
          key={color}
          className={styles.bar}
          style={{
            // @ts-expect-error custom property
            "--bar-color": `var(${color})`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
