import { FaSpotify } from "react-icons/fa";
import { SpotifyButton } from "../../../ui/SpotifyButton/SpotifyButton";
import styles from "./SpotifyConnection.module.css";

export function SpotifyConnection() {
  return (
    <div className={styles.bar}>
      <div className={styles.identity}>
        <FaSpotify className={styles.logo} aria-hidden="true" />
        <div className={styles.text}>
          <h2 className={styles.title}>Spotify</h2>
          <p className={styles.desc}>Sign in with Spotify and link your account to MoodWave.</p>
        </div>
      </div>
      <SpotifyButton />
    </div>
  );
}
