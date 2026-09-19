export type MoodEntry = {
  id: string;
  mood: number;
  note: string | null;
  aiEmotion: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type PaginatedEntries = {
  entries: MoodEntry[];
  total: number;
  limit: number;
  offset: number;
};

export type ListEntriesParams = {
  limit?: number;
  offset?: number;
};

export type StreakResponse = {
  streak: number;
};

export type EntryStatsResponse = {
  totalEntries: number;
  topMood: { emoji: string; label: string } | null;
};
