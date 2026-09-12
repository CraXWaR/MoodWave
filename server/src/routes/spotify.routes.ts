import { Router } from "express";
import { SpotifyController } from "../controllers/spotify.controller";
import authenticate from "../middleware/authenticate";

const router = Router();
const spotifyController = new SpotifyController();

router.get("/login", authenticate, spotifyController.login);
router.get("/callback", spotifyController.callback);
router.get("/status", authenticate, spotifyController.getStatus);
router.delete("/disconnect", authenticate, spotifyController.disconnect);
router.get("/login-with-spotify", spotifyController.loginWithSpotify);

export default router;
