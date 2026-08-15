import { api } from "./api";
import type { ListEntriesParams, MoodEntry, PaginatedEntries, StreakResponse } from "../types/entry.type.ts";

interface CreateMoodEntryPayload {
  mood: number;
  note?: string;
}

export const entriesService = {
  list: async (params?: ListEntriesParams) => {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    if (params?.offset !== undefined) query.set("offset", String(params.offset));
    
    const queryString = query.toString();
    return api.get<PaginatedEntries>(`/entries/get-entries${queryString ? `?${queryString}` : ""}`);
  },

  create: (payload: CreateMoodEntryPayload) => api.post<MoodEntry>("/entries/create", payload),

  getStreak: (): Promise<StreakResponse> => api.get<StreakResponse>("/entries/get-streak"),
};
