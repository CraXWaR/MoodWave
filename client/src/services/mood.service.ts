import { api } from "./api";
import type { Mood } from "../types/mood.type";

export const moodsService = {
  list: async () => api.get<Mood[]>("/moods/list"),
};
