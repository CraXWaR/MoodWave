interface IStreakEntry {
  createdAt: Date;
}

interface IStreakService {
  calculateStreak(entries: IStreakEntry[]): number;
}

export class StreakCalculation implements IStreakService {
  private static toDayKey(date: Date): string {
    const [dayKey] = date.toISOString().split("T");
    return dayKey!;
  }

  calculateStreak(entries: IStreakEntry[]): number {
    if (entries.length === 0) return 0;

    const uniqueDays = Array.from(new Set(entries.map((e) => StreakCalculation.toDayKey(e.createdAt)))).sort((a, b) =>
      a < b ? 1 : -1,
    );

    const mostRecent = uniqueDays[0];
    if (!mostRecent) return 0;

    const todayKey = StreakCalculation.toDayKey(new Date());
    const yesterdayKey = StreakCalculation.toDayKey(new Date(Date.now() - 86400000));

    if (mostRecent !== todayKey && mostRecent !== yesterdayKey) {
      return 0;
    }

    let streak = 1;
    for (let i = 0; i < uniqueDays.length - 1; i++) {
      const currentKey = uniqueDays[i];
      const nextKey = uniqueDays[i + 1];
      if (!currentKey || !nextKey) break;

      const current = new Date(currentKey);
      const next = new Date(nextKey);
      const diffDays = (current.getTime() - next.getTime()) / 86400000;

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
}
