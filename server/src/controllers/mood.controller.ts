import type { Request, Response } from "express";
import { MoodService } from "../services/mood.service";
import { ErrorService } from "../utils/service-error.js";

export class MoodController {
  private moodService = new MoodService();

  list = async (_req: Request, res: Response) => {
    try {
      const moods = await this.moodService.listAllMoods();
      res.status(200).json(moods);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
