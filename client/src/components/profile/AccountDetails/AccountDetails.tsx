import { ProfileCard } from "../ProfileCard/ProfileCard";
import styles from "./AccountDetails.module.css";

interface AccountDetailsProps {
  email: string;
  hasPassword: boolean;
  createdAt: string;
}

export function AccountDetails({ email, hasPassword, createdAt }: AccountDetailsProps) {
  const memberSince = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ProfileCard title="Account" description="The basics of how you sign in to MoodWave.">
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Email</dt>
          <dd className={styles.value}>{email}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.label}>Sign-in method</dt>
          <dd className={styles.value}>
            <span className={hasPassword ? styles.badge : `${styles.badge} ${styles.badgeSpotify}`}>
              {hasPassword ? "Email & password" : "Spotify only"}
            </span>
          </dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.label}>Member since</dt>
          <dd className={styles.value}>{memberSince}</dd>
        </div>
      </dl>
    </ProfileCard>
  );
}