import { useId, type CSSProperties } from "react";
import { PERIOD, HEIGHT, WAVES, buildPath } from "../../../helpers/waveform";
import { loopSpectrum } from "../../../helpers/spectrum";
import styles from "./SoundBars.module.css";

const PATHS = WAVES.map((wave) => ({ key: wave.key, d: buildPath(wave) }));

const SVG_STYLE = { "--period": `${PERIOD}px` } as CSSProperties;

interface SoundBarsProps {
  tokens: string[];
}

export function SoundBars({ tokens }: SoundBarsProps) {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const stops = loopSpectrum(tokens);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.svg} style={SVG_STYLE} viewBox={`0 0 ${PERIOD} ${HEIGHT}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={PERIOD * 2} y2="0">
            {stops.map((token, i) => (
              <stop
                key={i}
                offset={`${(i / (stops.length - 1)) * 100}%`}
                style={{ stopColor: `var(--mood-${token})` }}
              />
            ))}
          </linearGradient>
        </defs>

        {PATHS.map(({ key, d }) => (
          <path key={key} className={`${styles.wave} ${styles[key]}`} d={d} stroke={`url(#${gradientId})`} />
        ))}
      </svg>
    </div>
  );
}
