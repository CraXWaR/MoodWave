import type { Request, Response, NextFunction } from "express";
import { MoodEntryService } from "../services/entry.service.js";
import { ErrorService } from "../utils/service-error.js";
import { IListByUserOptions } from "../types/listByUserOptions.interface.js";
import { MoodService } from "../services/mood.service.js";

interface CreateMoodEntryBody {
  mood: number;
  note?: string;
}

export class MoodEntryController {
  private entryService = new MoodEntryService();
  private moodService = new MoodService();
  private static readonly TOP_MOOD_WINDOW_DAYS = 30;

  create = async (req: Request<{}, {}, CreateMoodEntryBody>, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { mood, note } = req.body;

      const entry = await this.entryService.create(userId, mood, note);
      res.status(201).json(entry);
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;

      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;

      if (limit !== undefined && (isNaN(limit) || limit <= 0 || limit > 100)) {
        throw new ErrorService("Invalid limit", 400);
      }
      if (offset !== undefined && (isNaN(offset) || offset < 0)) {
        throw new ErrorService("Invalid offset", 400);
      }

      const options: IListByUserOptions = {};
      if (limit !== undefined) options.limit = limit;
      if (offset !== undefined) options.offset = offset;

      const result = await this.entryService.listByUser(userId, options);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getStreak = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streak = await this.entryService.getStreak(req.user.id);
      res.json({ streak });
    } catch (err) {
      next(err);
    }
  };

  getCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.user;
      const calendar = await this.entryService.getCalendar(userId);
      res.status(200).json(calendar);
    } catch (err) {
      next(err);
    }
  };

  stats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const windowMs = MoodEntryController.TOP_MOOD_WINDOW_DAYS * 24 * 60 * 60 * 1000;
      const since = new Date(Date.now() - windowMs);

      const [totalEntries, recent] = await Promise.all([
        this.entryService.countByUser(userId),
        this.entryService.getMoodCountsSince(userId, since),
      ]);

      const top = [...recent].sort(
        (a, b) => b._count.mood - a._count.mood || b._max.createdAt!.getTime() - a._max.createdAt!.getTime(),
      )[0];

      const moodRow = top ? await this.moodService.getMoodByValue(top.mood) : null;

      res.json({
        totalEntries,
        topMood: moodRow ? { emoji: moodRow.emoji, label: moodRow.label } : null,
      });
    } catch (err) {
      next(err);
    }
  };
}
