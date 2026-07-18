import { MoodEntry } from "../../prisma/generated/prisma/index.js";
import prisma from "../db/prisma.js";
import { IListByUserOptions } from "../types/listByUserOptions.interface.js";
import { ErrorService } from "../utils/service-error.js";

interface PaginatedResult<T> {
  entries: T[];
  total: number;
  limit: number;
  offset: number;
}

export class MoodEntryService {
  async create(userId: string, mood: number, note?: string) {
    if (!Number.isInteger(mood) || mood < 1 || mood > 5) {
      throw new ErrorService("Mood must be a number between 1 and 5", 400);
    }

    return prisma.moodEntry.create({
      data: { userId, mood, note: note ?? null },
    });
  }

  async listByUser(
    userId: string,
    { limit = 20, offset = 0 }: IListByUserOptions = {},
  ): Promise<PaginatedResult<MoodEntry>> {
    const [entries, total] = await Promise.all([
      prisma.moodEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.moodEntry.count({ where: { userId } }),
    ]);

    return { entries, total, limit, offset };
  }

  async findById(id: string, userId: string) {
    const entry = await prisma.moodEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      throw new ErrorService("Mood entry not found", 404);
    }

    return entry;
  }
}
