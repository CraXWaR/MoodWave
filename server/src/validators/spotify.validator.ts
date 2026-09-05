import { z } from "zod";

export const spotifyCallbackSchema = z.object({
  code: z.string().min(1, "Missing authorization code"),
  state: z.string().min(1, "Missing state"),
});
