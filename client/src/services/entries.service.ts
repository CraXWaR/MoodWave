import { api } from "./api";
import type { MoodEntry } from "../types/entry.type.ts";

interface CreateMoodEntryPayload {
  mood: number;
  note?: string;
}

export const entriesService = {
  list: () => api.get<MoodEntry[]>("/entries/get-entries"),
  create: (payload: CreateMoodEntryPayload) => api.post<MoodEntry>("/entries/create", payload),
};
