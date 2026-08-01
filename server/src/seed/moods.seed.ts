import type { PrismaClient } from "../../prisma/generated/prisma/index.js";

const SEED_MOODS = [
  { value: 1, emoji: "😞", label: "Stressed", token: "stressed" },
  { value: 2, emoji: "😕", label: "Sad", token: "sad" },
  { value: 3, emoji: "😐", label: "Burnt out", token: "burnout" },
  { value: 4, emoji: "🙂", label: "Calm", token: "calm" },
  { value: 5, emoji: "😄", label: "Joyful", token: "joy" },
] as const;

export async function seedMoods(prisma: PrismaClient): Promise<void> {
  for (const mood of SEED_MOODS) {
    await prisma.mood.upsert({
      where: { value: mood.value },
      update: {}, // already exists - leave, don't overwrite edits
      create: mood,
    });
  }
}
