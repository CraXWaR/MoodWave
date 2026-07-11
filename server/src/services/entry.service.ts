import prisma from "../db/prisma.js";
import { ErrorService } from "../utils/service-error.js";

export class MoodEntryService {
  async create(userId: string, mood: number, note?: string) {
    if (!Number.isInteger(mood) || mood < 1 || mood > 5) {
      throw new ErrorService("Mood must be a number between 1 and 5", 400);
    }

    return prisma.moodEntry.create({
      data: { userId, mood, note: note ?? null },
    });
  }

  async listByUser(userId: string) {
    return prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
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
