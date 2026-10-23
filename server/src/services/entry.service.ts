import { MoodEntry } from "../../prisma/generated/prisma/index.js";
import prisma from "../db/prisma.js";
import { CalendarDay } from "../types/calendar.interface.js";
import { IListByUserOptions } from "../types/listByUserOptions.interface.js";
import { ErrorService } from "../utils/service-error.js";
import { StreakCalculation } from "../utils/streak.js";
import { AiService } from "./ai.service.js";
import { CalendarService } from "./calendar.service.js";

interface PaginatedResult<T> {
  entries: T[];
  total: number;
  limit: number;
  offset: number;
}

export class MoodEntryService {
  private aiService = new AiService();
  private streakService = new StreakCalculation();
  private calendarService = new CalendarService();

  async create(userId: string, mood: number, note?: string) {
    const entry = await prisma.moodEntry.create({
      data: { userId, mood, note: note ?? null },
    });

    this.detectAndSaveEmotion(entry.id, note ?? null);
    return entry;
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

  async getStreak(userId: string): Promise<number> {
    const entries = await prisma.moodEntry.findMany({
      where: { userId },
      select: { createdAt: true },
    });
    return this.streakService.calculateStreak(entries);
  }

  private detectAndSaveEmotion(entryId: string, note: string | null): void {
    this.aiService
      .detectEmotion(note)
      .then((aiEmotion) => {
        if (!aiEmotion) return;
        return prisma.moodEntry.update({
          where: { id: entryId },
          data: { aiEmotion },
        });
      })
      .catch((error) => {
        console.error(`Failed to save aiEmotion for entry ${entryId}:`, error);
      });
  }

  async getCalendar(userId: string): Promise<CalendarDay[]> {
    const entries = await prisma.moodEntry.findMany({
      where: { userId },
      select: { createdAt: true, mood: true },
    });
    return this.calendarService.getCalendar(entries);
  }

  async countByUser(userId: string) {
    return prisma.moodEntry.count({ where: { userId } });
  }

  async getMoodCountsSince(userId: string, since: Date) {
    return prisma.moodEntry.groupBy({
      by: ["mood"],
      where: { userId, createdAt: { gte: since } },
      _count: { mood: true },
      _max: { createdAt: true },
    });
  }
}
