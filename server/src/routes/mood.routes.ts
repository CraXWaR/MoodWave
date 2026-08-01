import { Router } from "express";
import { MoodController } from "../controllers/mood.controller";

const router = Router();
const moodController = new MoodController();

router.get("/list", moodController.list);

export default router;
