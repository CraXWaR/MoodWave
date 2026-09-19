import { useAuth } from "../../context/auth.context";
import { ProfileHero } from "../../components/profile/ProfileHero/ProfileHero";
import { ProfileStats } from "../../components/profile/ProfileStats/ProfileStats";
import { AccountDetails } from "../../components/profile/AccountDetails/AccountDetails";
import { SpotifySection } from "../../components/profile/spotify/SpotifySection/SpotifySection";

import { useProfileStats } from "../../hooks/useProfileStats";

import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const { stats } = useProfileStats();

  if (!user) return null;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <ProfileHero email={user.email}>{stats && <ProfileStats {...stats} />}</ProfileHero>

        <div className={styles.grid}>
          <SpotifySection />
          <aside className={styles.aside}>
            <AccountDetails email={user.email} hasPassword={user.hashedPassword} createdAt={user.createdAt} />
          </aside>
        </div>
      </div>
    </main>
  );
}
