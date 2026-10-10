import { useState } from "react";
import { ApiError } from "../services/api";
import { playlistService } from "../services/playlist.service";
import type { CreatedPlaylist, GenerateResult, TrackMatchResult } from "../types/playlist.type";

type GeneratePhase = "idle" | "generating" | "results" | "creating" | "done";
type LastSource = { type: "prompt"; value: string } | { type: "mood"; value: number }; // ADD THIS

interface CreatePlaylistErrorBody {
  playlist?: CreatedPlaylist;
}

// When the playlist was created but its songs couldn't be added, the server sends the playlist back
function getHalfCreatedPlaylist(err: unknown): CreatedPlaylist | null {
  if (!(err instanceof ApiError)) return null;
  const errorBody = err.data as CreatePlaylistErrorBody | null;
  return errorBody?.playlist ?? null;
}

export function usePlaylistGenerator() {
  const [phase, setPhase] = useState<GeneratePhase>("idle");
  const [tracks, setTracks] = useState<TrackMatchResult[]>([]);
  const [removedIndexes, setRemovedIndexes] = useState<Set<number>>(new Set());
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourceText, setSourceText] = useState<string>("");
  const [lastSource, setLastSource] = useState<LastSource | null>(null);
  const [createdPlaylist, setCreatedPlaylist] = useState<CreatedPlaylist | null>(null);
  // an empty playlist already on Spotify; the next save adds to it instead of creating a duplicate
  const [pendingPlaylist, setPendingPlaylist] = useState<CreatedPlaylist | null>(null);

  const handleResult = (result: GenerateResult, promptUsedForNaming: string) => {
    if (result.rejected) {
      setRejectionMessage(result.message);
      setPhase("idle");
      return;
    }

    setTracks(result.tracks);
    setRemovedIndexes(new Set());
    // a new batch gets a new name, so don't resume into the playlist named after the old one
    setPendingPlaylist(null);
    setSourceText(promptUsedForNaming);
    setRejectionMessage(null);
    setPhase("results");
  };

  const generateFromPrompt = async (prompt: string) => {
    setPhase("generating");
    setError(null);
    setRejectionMessage(null);
    setLastSource({ type: "prompt", value: prompt });
    try {
      const result = await playlistService.generateFromPrompt(prompt);
      handleResult(result, prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPhase("idle");
    }
  };

  const generateFromMood = async (moodValue: number) => {
    setPhase("generating");
    setError(null);
    setRejectionMessage(null);
    setLastSource({ type: "mood", value: moodValue });
    try {
      const result = await playlistService.generateFromMood(moodValue);
      handleResult(result, `mood score ${moodValue}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPhase("idle");
    }
  };

  const regenerate = async () => {
    if (!lastSource) return;
    if (lastSource.type === "prompt") {
      await generateFromPrompt(lastSource.value);
    } else {
      await generateFromMood(lastSource.value);
    }
  };

  const removeTrack = (index: number) => {
    setRemovedIndexes((prev) => new Set(prev).add(index));
  };

  const confirmPlaylist = async () => {
    const urisToSave = tracks
      .map((track, index) => ({ track, index }))
      .filter(({ track, index }) => track.matched && !removedIndexes.has(index))
      .map(({ track }) => (track as { spotifyUri: string }).spotifyUri);

    if (urisToSave.length === 0) {
      setError("No tracks selected to save.");
      return;
    }

    setPhase("creating");
    setError(null);

    try {
      if (pendingPlaylist) {
        await playlistService.addTracksToPlaylist(pendingPlaylist.id, urisToSave);
        setCreatedPlaylist(pendingPlaylist);
      } else {
        const playlist = await playlistService.createPlaylist({
          uris: urisToSave,
          sourceText,
        });
        setCreatedPlaylist(playlist);
      }
      setPendingPlaylist(null);
      setPhase("done");
    } catch (err) {
      const halfCreatedPlaylist = getHalfCreatedPlaylist(err);
      if (halfCreatedPlaylist) setPendingPlaylist(halfCreatedPlaylist);
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPhase("results");
    }
  };

  const reset = () => {
    setPhase("idle");
    setTracks([]);
    setRemovedIndexes(new Set());
    setRejectionMessage(null);
    setError(null);
    setSourceText("");
    setLastSource(null);
    setCreatedPlaylist(null);
    setPendingPlaylist(null);
  };

  return {
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
  };
}
