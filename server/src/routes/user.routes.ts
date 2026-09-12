import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import authenticate from "../middleware/authenticate";

const router = Router();
const userController = new UserController();

router.post("/login", userController.login);
router.post("/register", userController.signup);
router.get("/me", authenticate, userController.getMe);

export default router;
