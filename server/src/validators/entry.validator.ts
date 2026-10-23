import { z } from "zod";

const MOOD_RANGE_MESSAGE = "Mood must be a number between 1 and 6";

export const createEntrySchema = z.object({
  mood: z.number({ error: MOOD_RANGE_MESSAGE }).int(MOOD_RANGE_MESSAGE).min(1, MOOD_RANGE_MESSAGE).max(6, MOOD_RANGE_MESSAGE),
  note: z.string({ error: "Note must be text" }).optional(),
});

export const listEntriesQuerySchema = z.object({
  limit: z.coerce
    .number({ error: "Invalid limit" })
    .int("Invalid limit")
    .positive("Invalid limit")
    .max(100, "Invalid limit")
    .optional(),
  offset: z.coerce.number({ error: "Invalid offset" }).int("Invalid offset").min(0, "Invalid offset").optional(),
});
