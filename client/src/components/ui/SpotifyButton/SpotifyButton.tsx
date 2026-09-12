import { FaSpotify } from "react-icons/fa6";

import { useSpotify } from "../../../hooks/useSpotifyButton";
import { ErrorState } from "../ErrorState/ErrorState";

import styles from "./SpotifyButton.module.css";

export function SpotifyButton() {
  const { status, actionLoading, error, label, isReady, handleClick } = useSpotify();

  if (!isReady) return null;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={handleClick}
        disabled={actionLoading}
        className={`${styles.button} ${status === "connected" ? styles.connected : ""}`}
      >
        <FaSpotify className={styles.icon} />
        <span>{actionLoading ? "Redirecting..." : label}</span>
      </button>
      {error && <ErrorState message={error} />}
    </div>
  );
}
