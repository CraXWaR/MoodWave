import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { ProfileHero } from "../../components/profile/ProfileHero/ProfileHero";
import { ProfileStats } from "../../components/profile/ProfileStats/ProfileStats";
import { AccountDetails } from "../../components/profile/AccountDetails/AccountDetails";
import { SpotifySection } from "../../components/profile/spotify/SpotifySection/SpotifySection";
import { CheckInCard } from "../../components/profile/CheckInCard/CheckInCard";
import { MoodHistory } from "../../components/profile/MoodHistory/MoodHistory";
import { LoadingState } from "../../components/ui/LoadingState/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState/ErrorState";

import { useProfileStats } from "../../hooks/useProfileStats";
import { useEntryHistory } from "../../hooks/useEntryHistory";
import { useGetMoods } from "../../hooks/useMoods";

import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);
  const { stats } = useProfileStats(statsRefreshKey);
  const { moods, loading: moodsLoading, error: moodsError, refetch: refetchMoods } = useGetMoods();
  const {
    entries,
    total,
    loading: entriesLoading,
    error: entriesError,
    hasMore,
    loadMore,
    refetch: refetchEntries,
  } = useEntryHistory();

  if (!user) return null;

  const handleSaved = () => {
    refetchEntries();
    setStatsRefreshKey((key) => key + 1);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <ProfileHero email={user.email}>{stats && <ProfileStats {...stats} />}</ProfileHero>

        <div className={styles.grid}>
          <div className={styles.main}>
            {moodsLoading && <LoadingState message="Loading your moods…" />}
            {moodsError && <ErrorState message={moodsError} onRetry={refetchMoods} />}
            {!moodsLoading && !moodsError && (
              <>
                <CheckInCard moods={moods} onSaved={handleSaved} onSensed={refetchEntries} />
                <MoodHistory
                  entries={entries}
                  total={total}
                  loading={entriesLoading}
                  error={entriesError}
                  hasMore={hasMore}
                  moods={moods}
                  onLoadMore={loadMore}
                  onRetry={refetchEntries}
                />
              </>
            )}
          </div>

          <aside className={styles.aside}>
            <SpotifySection />
            <AccountDetails email={user.email} hasPassword={user.hashedPassword} createdAt={user.createdAt} />
          </aside>
        </div>
      </div>
    </main>
  );
}
