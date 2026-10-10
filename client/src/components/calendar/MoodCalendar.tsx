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
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    days.push(day.toISOString().substring(0, 10));
  }
  return days;
}
function formatRange(days: string[]): string {
  if (days.length === 0) return "";
  const start = new Date(days[0]);
  const end = new Date(days[days.length - 1]);
  const formatDate = (date: Date) => date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${formatDate(start)} – ${formatDate(end)}`;
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

  const calendarByDate = new Map(calendar.map((calendarDay) => [calendarDay.date, calendarDay]));
  const moodsByValue = new Map(moods.map((mood) => [mood.value, mood]));
  const todayKey = new Date().toISOString().substring(0, 10);

  return (
    <div className={styles.wrapper}>
      <div className={styles.popover}>
        <div className={styles.header}>
          <p className={styles.title}>Mood calendar</p>
          <span className={styles.range}>{formatRange(days)}</span>
        </div>

        <div className={styles.grid}>
          {days.map((date) => {
            const entry = calendarByDate.get(date);
            const moodValue = entry?.mood != null ? Math.round(entry.mood) : null;
            const mood = moodValue != null ? moodsByValue.get(moodValue) : undefined;
            const isToday = date === todayKey;

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
