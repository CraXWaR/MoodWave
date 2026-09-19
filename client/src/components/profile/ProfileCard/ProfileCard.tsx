
import type { ReactNode } from "react";
import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ProfileCard({ title, description, children }: ProfileCardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}