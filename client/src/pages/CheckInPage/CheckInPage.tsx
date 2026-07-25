import { useNavigate } from "react-router-dom";
import { CheckInForm } from "../../components/checkin/CheckInForm/CheckInForm";

import styles from "./CheckInPage.module.css";

export default function CheckInPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CheckInForm onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
