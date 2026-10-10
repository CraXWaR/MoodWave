import bcrypt from "bcrypt";
import type { PrismaClient } from "../../prisma/generated/prisma/index.js";

interface DemoEntry {
  mood: number;
  note: string;
  aiEmotion: string;
}

interface SeedEntryRow {
  userId: string;
  mood: number;
  note: string | null;
  aiEmotion: string | null;
  createdAt: Date;
}

interface DemoSeedResult {
  email: string;
  password: string;
  entryCount: number;
}

const DEMO_EMAIL = "demo@moodwave.dev";
const DEMO_PASSWORD = "demo1234";

const HISTORY_DAYS = 84;
const UNBROKEN_STREAK_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

// aiEmotion is pre-filled so seeding never calls Groq
const SAMPLE_ENTRIES: DemoEntry[] = [
  { mood: 4, note: "Slow morning, coffee on the balcony. Felt grounded.", aiEmotion: "calm" },
  { mood: 5, note: "Finally shipped the feature I was stuck on all week!", aiEmotion: "joy" },
  { mood: 1, note: "Three deadlines landed on the same day.", aiEmotion: "stressed" },
  { mood: 4, note: "Long walk after work, cleared my head.", aiEmotion: "calm" },
  { mood: 6, note: "Can't stop overthinking tomorrow's presentation.", aiEmotion: "anxious" },
  { mood: 5, note: "Dinner with friends, laughed until my face hurt.", aiEmotion: "joy" },
  { mood: 3, note: "Running on empty, everything feels like a chore.", aiEmotion: "burnout" },
  { mood: 2, note: "Missing home today.", aiEmotion: "sad" },
  { mood: 4, note: "Quiet evening reading. Nothing special, and that's nice.", aiEmotion: "calm" },
  { mood: 5, note: "New personal best at the gym and a full night of sleep.", aiEmotion: "joy" },
];

// Fixed hour (UTC) on the given day, clamped to now so today's entries are never in the future
function buildEntryDate(daysAgo: number, hourUtc: number): Date {
  const now = new Date();
  const todayMidnightUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const timestamp = todayMidnightUtc - daysAgo * DAY_MS + hourUtc * HOUR_MS;
  return new Date(Math.min(timestamp, now.getTime()));
}

function buildEntries(userId: string): SeedEntryRow[] {
  const entries: SeedEntryRow[] = [];

  for (let daysAgo = HISTORY_DAYS - 1; daysAgo >= 0; daysAgo--) {
    // skip roughly every fifth day, but keep the most recent days unbroken for the streak
    const isSkippedDay = daysAgo >= UNBROKEN_STREAK_DAYS && daysAgo % 5 === 3;
    if (isSkippedDay) continue;

    const hasEveningEntry = daysAgo > 0 && daysAgo % 7 === 0;
    const entryHours = hasEveningEntry ? [9, 20] : [9];

    entryHours.forEach((hourUtc, entryIndex) => {
      const sample = SAMPLE_ENTRIES[(daysAgo * 7 + entryIndex * 3) % SAMPLE_ENTRIES.length]!;
      const hasNote = daysAgo % 4 !== 1;

      entries.push({
        userId,
        mood: sample.mood,
        note: hasNote ? sample.note : null,
        aiEmotion: hasNote ? sample.aiEmotion : null,
        createdAt: buildEntryDate(daysAgo, hourUtc),
      });
    });
  }

  return entries;
}

export async function seedDemoData(prisma: PrismaClient): Promise<DemoSeedResult> {
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { password: hashedPassword },
    create: { email: DEMO_EMAIL, password: hashedPassword },
  });

  // reseeding replaces the demo history instead of stacking duplicates
  await prisma.moodEntry.deleteMany({ where: { userId: user.id } });

  const entries = buildEntries(user.id);
  await prisma.moodEntry.createMany({ data: entries });

  return { email: DEMO_EMAIL, password: DEMO_PASSWORD, entryCount: entries.length };
}
