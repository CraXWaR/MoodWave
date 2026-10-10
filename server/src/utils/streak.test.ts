import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StreakCalculation } from "./streak.js";

const NOW = new Date("2026-10-10T15:00:00.000Z");

function entryOn(isoDate: string) {
  return { createdAt: new Date(`${isoDate}T12:00:00.000Z`) };
}

describe("StreakCalculation.calculateStreak", () => {
  const streakCalculation = new StreakCalculation();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 0 when there are no entries", () => {
    expect(streakCalculation.calculateStreak([])).toBe(0);
  });

  it("returns 1 for a single entry today", () => {
    expect(streakCalculation.calculateStreak([entryOn("2026-10-10")])).toBe(1);
  });

  it("counts consecutive days ending today", () => {
    const entries = [entryOn("2026-10-08"), entryOn("2026-10-09"), entryOn("2026-10-10")];
    expect(streakCalculation.calculateStreak(entries)).toBe(3);
  });

  it("keeps the streak alive when the latest entry was yesterday", () => {
    const entries = [entryOn("2026-10-08"), entryOn("2026-10-09")];
    expect(streakCalculation.calculateStreak(entries)).toBe(2);
  });

  it("returns 0 when the latest entry is older than yesterday", () => {
    const entries = [entryOn("2026-10-07"), entryOn("2026-10-08")];
    expect(streakCalculation.calculateStreak(entries)).toBe(0);
  });

  it("counts several entries on the same day once", () => {
    const entries = [entryOn("2026-10-09"), entryOn("2026-10-10"), entryOn("2026-10-10"), entryOn("2026-10-10")];
    expect(streakCalculation.calculateStreak(entries)).toBe(2);
  });

  it("stops counting at the first missing day", () => {
    const entries = [entryOn("2026-10-05"), entryOn("2026-10-06"), entryOn("2026-10-09"), entryOn("2026-10-10")];
    expect(streakCalculation.calculateStreak(entries)).toBe(2);
  });

  it("does not depend on the order entries arrive in", () => {
    const entries = [entryOn("2026-10-10"), entryOn("2026-10-08"), entryOn("2026-10-09")];
    expect(streakCalculation.calculateStreak(entries)).toBe(3);
  });
});
