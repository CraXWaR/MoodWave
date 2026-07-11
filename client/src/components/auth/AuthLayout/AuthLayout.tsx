import { type ReactNode } from "react";
import MoodWave from "../MoodWave/MoodWave";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export default function AuthLayout({ eyebrow, title, children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <section className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <span className={styles.wordmark}>MoodWave</span>
          <h1 className={styles.headline}>
            Every mood
            <br />
            has a soundtrack.
          </h1>
          <p className={styles.subhead}>
            Log how you feel, and MoodWave reads the emotion behind it — then builds a playlist that matches it, or
            shifts it.
          </p>
          <MoodWave />
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.formTitle}>{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
}
