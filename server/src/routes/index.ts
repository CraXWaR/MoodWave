import { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";
import entryRoutes from "./entry.routes";
import moodRoutes from "./mood.routes";
import spotifyRoutes from "./spotify.routes";

const router = Router();

// register all route modules here
router.use("/health", healthRoutes);
router.use("/auth", userRoutes);
router.use("/entries", entryRoutes);
router.use("/moods", moodRoutes);
router.use("/spotify", spotifyRoutes);

export default router;
