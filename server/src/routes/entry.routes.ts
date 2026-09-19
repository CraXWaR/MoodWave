import { Router } from "express";
import { MoodEntryController } from "../controllers/entry.controller";

import authenticate from "../middleware/authenticate";

const router = Router();
const entryController = new MoodEntryController();

router.post("/create", authenticate, entryController.create);
router.get("/get-entries", authenticate, entryController.list);
router.get("/get-streak", authenticate, entryController.getStreak);
router.get("/get-calendar", authenticate, entryController.getCalendar);
router.get("/stats", authenticate, entryController.stats);

export default router;
