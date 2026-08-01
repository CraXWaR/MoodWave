import { useNavigate } from "react-router-dom";
import { useGetMoods } from "../../hooks/useMoods";

import { CheckInForm } from "../../components/checkin/CheckInForm/CheckInForm";
import { ErrorState } from "../../components/ui/ErrorState/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState/LoadingState";

import styles from "./CheckInPage.module.css";

export default function CheckInPage() {
  const { moods, loading: moodsLoading, error: moodsError, refetch: refetchMoods } = useGetMoods();
  const navigate = useNavigate();

  if (moodsLoading) {
    return <LoadingState message="Loading your moods…" />;
  }
  if (moodsError) {
    return <ErrorState message={moodsError} onRetry={refetchMoods} />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CheckInForm moods={moods} onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
