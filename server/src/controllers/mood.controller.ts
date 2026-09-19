import type { Request, Response, NextFunction } from "express";
import { MoodService } from "../services/mood.service";

export class MoodController {
  private moodService = new MoodService();

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const moods = await this.moodService.listAllMoods();
      res.status(200).json(moods);
    } catch (err) {
      next(err);
    };
  }
}
