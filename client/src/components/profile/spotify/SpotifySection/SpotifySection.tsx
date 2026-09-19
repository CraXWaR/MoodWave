// components/profile/spotify/SpotifySection/SpotifySection.tsx
import type { ReactNode } from "react";
import { SpotifyConnection } from "../SpotifyConnection/SpotifyConnection";
import styles from "./SpotifySection.module.css";

export function SpotifySection({ children }: { children?: ReactNode }) {
  return (
    <section className={styles.section}>
      <SpotifyConnection />
      {children}
    </section>
  );
}