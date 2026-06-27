import { Router } from "express";
import healthRoutes from "./health.routes";

const router = Router();

// register all route modules here
router.use("/health", healthRoutes);

export default router;