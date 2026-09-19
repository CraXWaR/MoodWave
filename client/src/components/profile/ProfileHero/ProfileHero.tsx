import { useMemo, type ReactNode } from "react";
import { SoundBars } from "../SoundBars/SoundBars";
import { Aurora } from "../Aurora/Aurora";
import { toSpectrum } from "../../../helpers/spectrum";
import { useGetMoods } from "../../../hooks/useMoods";

import styles from "./ProfileHero.module.css";

interface ProfileHeroProps {
  email: string;
  children?: ReactNode;
}

export function ProfileHero({ email, children }: ProfileHeroProps) {
  const name = email.split("@")[0];
  const { moods } = useGetMoods();
  const tokens = useMemo(() => toSpectrum(moods), [moods]);

  return (
    <header className={styles.hero}>
      <div className={styles.banner}>
        {tokens.length > 1 && (
          <>
            <Aurora tokens={tokens} />
            <SoundBars tokens={tokens} />
          </>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.identity}>
          <div className={styles.ring}>
            <div className={styles.avatar} aria-hidden="true">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className={styles.text}>
            <p className={styles.eyebrow}>Your profile</p>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.email}>{email}</p>
          </div>
        </div>

        {children && <div className={styles.footer}>{children}</div>}
      </div>
    </header>
  );
}
