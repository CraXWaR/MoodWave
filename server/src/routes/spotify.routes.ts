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
router.post("/playlist/generate/prompt", authenticate, spotifyController.generateFromPrompt);
router.post("/playlist/generate/mood", authenticate, spotifyController.generateFromMood);
router.post("/playlist/create", authenticate, spotifyController.createPlaylist);

export default router;
