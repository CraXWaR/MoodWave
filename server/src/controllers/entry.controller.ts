import type { Request, Response, NextFunction } from "express";
import { MoodEntryService } from "../services/entry.service.js";

interface CreateMoodEntryBody {
  mood: number;
  note?: string;
}

export class MoodEntryController {
  private entryService = new MoodEntryService();

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
      const entries = await this.entryService.listByUser(userId);
      res.status(200).json(entries);
    } catch (err) {
      next(err);
    }
  };
}
