import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>MoodWave</span>
          <p className={styles.tagline}>
            AI-powered mood tracker &amp; Spotify playlist curator
          </p>
        </div>

        <p className={styles.copyright}>© {year} MoodWave</p>
      </div>
    </footer>
  );
}
