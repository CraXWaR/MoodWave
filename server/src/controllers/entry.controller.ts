import type { Request, Response } from "express";
import { MoodEntryService } from "../services/entry.service.js";
import { ErrorService } from "../utils/service-error.js";
import { IListByUserOptions } from "../types/listByUserOptions.interface.js";
import { MoodService } from "../services/mood.service.js";
import { createEntrySchema, listEntriesQuerySchema } from "../validators/entry.validator.js";

export class MoodEntryController {
  private entryService = new MoodEntryService();
  private moodService = new MoodService();
  private static readonly TOP_MOOD_WINDOW_DAYS = 30;

  create = async (req: Request, res: Response) => {
    const parsed = createEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    }

    try {
      const { mood, note } = parsed.data;

      const entry = await this.entryService.create(req.user.id, mood, note);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  list = async (req: Request, res: Response) => {
    const parsed = listEntriesQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    }

    try {
      const { limit, offset } = parsed.data;

      const options: IListByUserOptions = {};
      if (limit !== undefined) options.limit = limit;
      if (offset !== undefined) options.offset = offset;

      const result = await this.entryService.listByUser(req.user.id, options);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  getStreak = async (req: Request, res: Response) => {
    try {
      const streak = await this.entryService.getStreak(req.user.id);
      res.json({ streak });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  getCalendar = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const calendar = await this.entryService.getCalendar(userId);
      res.status(200).json(calendar);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  stats = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const windowMs = MoodEntryController.TOP_MOOD_WINDOW_DAYS * 24 * 60 * 60 * 1000;
      const since = new Date(Date.now() - windowMs);

      const [totalEntries, recent] = await Promise.all([
        this.entryService.countByUser(userId),
        this.entryService.getMoodCountsSince(userId, since),
      ]);

      const top = [...recent].sort(
        (firstMood, secondMood) =>
          secondMood._count.mood - firstMood._count.mood ||
          secondMood._max.createdAt!.getTime() - firstMood._max.createdAt!.getTime(),
      )[0];

      const moodRow = top ? await this.moodService.getMoodByValue(top.mood) : null;

      res.json({
        totalEntries,
        topMood: moodRow ? { emoji: moodRow.emoji, label: moodRow.label } : null,
      });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
