import { Link } from "react-router-dom";

import { WaveForm } from "../../components/ui/WaveForm/WaveForm";

import styles from "./GuestHomePage.module.css";

// Swap this for your real src/constants/moods.ts MOODS array if want
// the waveform colors to stay in sync with the actual app.

export default function GuestHomePage() {
  return (
    <div className={styles.page}>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Mood tracking, set to sound</p>
            <h1 className={styles.headline}>
              Feel it. Log it. <em>Hear</em> it back.
            </h1>
            <p className={styles.subhead}>
              MoodWave turns a few seconds of checking in into a clearer picture of how you've been — and, soon, a
              playlist that actually matches it.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/register" className={styles.primaryCta}>
                Start checking in
              </Link>
              <Link to="/login" className={styles.secondaryCta}>
                Log in
              </Link>
            </div>
          </div>
          <WaveForm variant="hero" />
        </section>

        <WaveForm variant="divider" />

        <section className={styles.howItWorks}>
          <div className={`${styles.card} ${styles.railCalm}`}>
            <p className={styles.cardLabel}>Check in</p>
            <p className={styles.cardBody}>Pick a mood, add a note if you want one. Ten seconds, most days.</p>
          </div>
          <div className={`${styles.card} ${styles.railAnxious}`}>
            <p className={styles.cardLabel}>See the pattern</p>
            <p className={styles.cardBody}>
              Your check-ins line up by day, so the shape of your week is right there — no math required.
            </p>
          </div>
          <div className={`${styles.card} ${styles.railJoy}`}>
            <div className={styles.cardHeaderRow}>
              <p className={styles.cardLabel}>Hear it back</p>
              <span className={styles.soonTag}>Coming soon</span>
            </div>
            <p className={styles.cardBody}>
              MoodWave reads your notes and builds a Spotify playlist that fits how you're actually feeling that day.
            </p>
          </div>
        </section>

        <section className={styles.ctaBanner}>
          <h2 className={styles.ctaHeadline}>Start where you are.</h2>
          <p className={styles.ctaSubhead}>No streaks to keep up, no perfect mood required. Just check in.</p>
          <Link to="/register" className={styles.primaryCta}>
            Create an account
          </Link>
        </section>
      </main>
    </div>
  );
}
