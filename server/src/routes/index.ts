import { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";

const router = Router();

// register all route modules here
router.use("/health", healthRoutes);
router.use("/auth", userRoutes);

export default router;