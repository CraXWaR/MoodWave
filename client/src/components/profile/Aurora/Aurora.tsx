import { buildSpectrumGradient } from "../../../helpers/spectrum";
import styles from "./Aurora.module.css";

export function Aurora({ tokens }: { tokens: string[] }) {
  return (
    <div className={styles.aurora} aria-hidden="true">
      <div className={styles.band} style={{ background: buildSpectrumGradient(tokens) }} />
    </div>
  );
}
