import { Router } from "express";
import { MoodEntryController } from "../controllers/entry.controller";

import authenticate from "../middleware/authenticate";

const router = Router();
const entryController = new MoodEntryController();

router.post("/create", authenticate, entryController.create);
router.get("/get-entries", authenticate, entryController.list);

export default router;
