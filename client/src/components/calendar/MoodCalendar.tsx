import { useGetCalendar } from "../../hooks/useGetCalendar";
import { useGetMoods } from "../../hooks/useMoods";
import styles from "./MoodCalendar.module.css";

const DAYS = 84;

// Helper Functions to build the calendar and format the date range
function buildDays(): string[] {
  const days: string[] = [];
  const today = new Date();
  const leadingGap = today.getDay() === 6 ? 0 : today.getDay() + 1;
  const total = DAYS + leadingGap;

  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().substring(0, 10));
  }
  return days;
}
function formatRange(days: string[]): string {
  if (days.length === 0) return "";
  const start = new Date(days[0]);
  const end = new Date(days[days.length - 1]);
  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}

export function MoodCalendar() {
  const { calendar, isLoading: calendarLoading, error: calendarError } = useGetCalendar();
  const { moods, loading: moodsLoading, error: moodsError } = useGetMoods();

  const isLoading = calendarLoading || moodsLoading;
  const error = calendarError || moodsError;

  const days = buildDays();

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.popover}>
          <div className={styles.header}>
            <p className={styles.title}>Mood calendar</p>
            <span className={styles.range}>{formatRange(days)}</span>
          </div>
          <div className={styles.loadingGrid}>
            {days.map((date) => (
              <div key={date} className={styles.loadingCell} />
            ))}
          </div>
          <p className={styles.loadingText}>Loading your mood history…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.popover}>
          <p className={styles.emptyState}>Couldn't load your mood history.</p>
        </div>
      </div>
    );
  }

  const byDate = new Map(calendar.map((d) => [d.date, d]));
  const moodsByValue = new Map(moods.map((m) => [m.value, m]));
  const todayStr = new Date().toISOString().substring(0, 10);

  return (
    <div className={styles.wrapper}>
      <div className={styles.popover}>
        <div className={styles.header}>
          <p className={styles.title}>Mood calendar</p>
          <span className={styles.range}>{formatRange(days)}</span>
        </div>

        <div className={styles.grid}>
          {days.map((date) => {
            const entry = byDate.get(date);
            const moodValue = entry?.mood != null ? Math.round(entry.mood) : null;
            const mood = moodValue != null ? moodsByValue.get(moodValue) : undefined;
            const isToday = date === todayStr;

            return (
              <div
                key={date}
                className={[styles.cell, isToday ? styles.today : ""].join(" ")}
                data-mood={mood?.token}
                data-empty={mood ? undefined : "true"}
                title={mood ? `${date} · ${mood.emoji} ${mood.label}` : `${date} · no entry`}
              />
            );
          })}
        </div>

        <div className={styles.legend}>
          {moods.map((mood) => (
            <span key={mood.id} className={styles.legendItem} data-mood={mood.token}>
              <span className={styles.swatch} />
              {mood.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
