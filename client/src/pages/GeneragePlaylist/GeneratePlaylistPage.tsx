import { useState, useMemo } from "react";
import { usePlaylistGenerator } from "../../hooks/usePlaylistGenerator";
import { useGetCalendar } from "../../hooks/useGetCalendar";
import styles from "./GeneragePlaylist.module.css";
import type { TrackMatchResult } from "../../types/playlist.type";

const MOOD_STYLE_BY_VALUE: Record<number, string> = {
  1: "stressed",
  2: "sad",
  3: "burnout",
  4: "calm",
  5: "joy",
  6: "anxious",
};

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function PlaylistGeneratorPage() {
  const [promptInput, setPromptInput] = useState("");
  const { calendar, isLoading: calendarLoading } = useGetCalendar();

  const {
    phase,
    tracks,
    removedIndexes,
    rejectionMessage,
    error,
    createdPlaylist,
    generateFromPrompt,
    generateFromMood,
    regenerate,
    removeTrack,
    confirmPlaylist,
    reset,
  } = usePlaylistGenerator();

  const todaysMood = useMemo(() => {
    if (!calendar) return null;
    const todayKey = getTodayKey();
    const entry = calendar.find((day) => day.date === todayKey);
    return entry?.mood ?? null;
  }, [calendar]);

  const nearestMoodToken = todaysMood !== null ? MOOD_STYLE_BY_VALUE[Math.round(todaysMood)] : null;

  const isGenerating = phase === "generating";
  const isResults = phase === "results";
  const isCreating = phase === "creating";
  const isDone = phase === "done";

  const visibleTracks = tracks.filter((_, index) => !removedIndexes.has(index));
  const savableCount = visibleTracks.filter((track) => track.matched).length;

  const handlePromptSubmit = () => {
    if (!promptInput.trim()) return;
    generateFromPrompt(promptInput.trim());
  };

  const handleMoodGenerate = () => {
    if (todaysMood === null) return;
    generateFromMood(todaysMood);
  };

  return (
    <div className={styles.page}>
      <div className={styles.column}>
        {!isResults && !isCreating && !isDone && (
          <>
            <h1 className={styles.title}>Turn today into a playlist</h1>
            <p className={styles.subtitle}>Describe how you're feeling, or let today's mood pick the songs.</p>

            <textarea
              className={styles.textarea}
              placeholder="I've had a strange, restless kind of day..."
              value={promptInput}
              onChange={(event) => setPromptInput(event.target.value)}
              rows={4}
              disabled={isGenerating}
            />

            {rejectionMessage && <p className={styles.rejection}>{rejectionMessage}</p>}
            {error && <p className={styles.danger}>{error}</p>}

            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={handlePromptSubmit}
                disabled={isGenerating || !promptInput.trim()}
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>

              <button
                className={styles.secondaryButton}
                onClick={handleMoodGenerate}
                disabled={isGenerating || calendarLoading || todaysMood === null}
                title={todaysMood === null ? "Log a mood entry today to use this" : undefined}
              >
                Generate from today's mood
              </button>
            </div>

            {todaysMood === null && !calendarLoading && (
              <p className={styles.hint}>Log a mood entry today to unlock this option.</p>
            )}

            {isGenerating && <div className={styles.pulseBar} />}
          </>
        )}

        {(isResults || isCreating) && (
          <div className={styles.resultsWrap} data-mood={nearestMoodToken ?? undefined}>
            <h2 className={styles.resultsTitle}>Your songs</h2>

            <ol className={styles.trackList}>
              {tracks.map((track, index) => {
                if (removedIndexes.has(index)) return null;
                return (
                  <TrackRow
                    key={`${track.title}-${track.artist}-${index}`}
                    position={index + 1}
                    track={track}
                    onRemove={() => removeTrack(index)}
                  />
                );
              })}
            </ol>

            {error && <p className={styles.danger}>{error}</p>}

            <div className={styles.actions}>
              <button className={styles.secondaryButton} onClick={regenerate} disabled={isCreating}>
                Regenerate
              </button>
              <button
                className={styles.primaryButton}
                onClick={confirmPlaylist}
                disabled={isCreating || savableCount === 0}
              >
                {isCreating ? "Saving..." : `Save ${savableCount} song${savableCount === 1 ? "" : "s"} to Spotify`}
              </button>
            </div>
          </div>
        )}

        {isDone && createdPlaylist && (
          <div className={styles.doneCard}>
            <h2 className={styles.resultsTitle}>{createdPlaylist.name}</h2>
            <p className={styles.subtitle}>Saved to your Spotify account.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href={createdPlaylist.externalUrl} target="_blank" rel="noreferrer">
                Open in Spotify
              </a>
              <button className={styles.secondaryButton} onClick={reset}>
                Make another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrackRow({ position, track, onRemove }: { position: number; track: TrackMatchResult; onRemove: () => void }) {
  return (
    <li className={track.matched ? styles.trackRow : styles.trackRowUnmatched}>
      <span className={styles.trackPosition}>{position}</span>

      {track.matched ? (
        <img className={styles.trackImage} src={track.albumImageUrl ?? undefined} alt="" />
      ) : (
        <div className={styles.trackImagePlaceholder} />
      )}

      <div className={styles.trackInfo}>
        <span className={styles.trackTitle}>{track.title}</span>
        <span className={styles.trackArtist}>{track.artist}</span>
        {!track.matched && <span className={styles.notFoundLabel}>Not found on Spotify</span>}
      </div>

      <button className={styles.removeButton} onClick={onRemove} aria-label={`Remove ${track.title}`}>
        ✕
      </button>
    </li>
  );
}
