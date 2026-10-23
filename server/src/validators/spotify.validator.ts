import { z } from "zod";

export const spotifyCallbackSchema = z.object({
  code: z.string().min(1, "Missing authorization code"),
  state: z.string().min(1, "Missing state"),
});

const trackUrisSchema = z
  .array(z.string(), { error: "At least one track URI is required" })
  .min(1, "At least one track URI is required");

export const generateFromPromptSchema = z.object({
  prompt: z.string({ error: "Prompt is required" }).trim().min(1, "Prompt is required"),
});

export const generateFromMoodSchema = z.object({
  moodValue: z.number({ error: "Invalid mood value" }).min(1, "Invalid mood value").max(6, "Invalid mood value"),
});

export const createPlaylistSchema = z.object({
  uris: trackUrisSchema,
  sourceText: z.string({ error: "Source text is required" }).min(1, "Source text is required"),
});

export const addTracksParamsSchema = z.object({
  playlistId: z.string().regex(/^[A-Za-z0-9]+$/, "Invalid playlist id"),
});

export const addTracksBodySchema = z.object({
  uris: trackUrisSchema,
});
