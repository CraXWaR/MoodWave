import { api } from "./api";
import type { CreatedPlaylist, GenerateResult } from "../types/playlist.type";

interface CreatePlaylistPayload {
  uris: string[];
  sourceText: string;
}

export const playlistService = {
  generateFromPrompt: (prompt: string): Promise<GenerateResult> =>
    api.post<GenerateResult>("/spotify/playlist/generate/prompt", { prompt }),

  generateFromMood: (moodValue: number): Promise<GenerateResult> =>
    api.post<GenerateResult>("/spotify/playlist/generate/mood", { moodValue }),

  createPlaylist: (prompt: CreatePlaylistPayload): Promise<CreatedPlaylist> =>
    api.post<CreatedPlaylist>("/spotify/playlist/create", prompt),
};
