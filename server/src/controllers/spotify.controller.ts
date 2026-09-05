import { Request, Response } from "express";
import crypto from "crypto";
import { SpotifyService } from "../services/spotify.service.js";
import { ErrorService } from "../utils/service-error.js";
import { spotifyCallbackSchema } from "../validators/spotify.validator.js";

// In-memory state store (swap for Redis once that's in place)
const pendingStates = new Map<string, string>(); // state -> userId

export class SpotifyController {
  private spotifyService = new SpotifyService();

  login = (req: Request, res: Response) => {
    try {
      const state = crypto.randomBytes(16).toString("hex");
      pendingStates.set(state, req.user!.id);

      const url = this.spotifyService.getAuthUrl(state);
      res.redirect(url);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  callback = async (req: Request, res: Response) => {
    if (req.query.error) {
      return res.redirect(`${process.env.FRONTEND_URL}/settings?spotify_error=access_denied`);
    }

    const parsed = spotifyCallbackSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.redirect(`${process.env.FRONTEND_URL}/settings?spotify_error=invalid_callback`);
    }

    try {
      const { code, state } = parsed.data;

      const userId = pendingStates.get(state);
      if (!userId) {
        throw new ErrorService("Invalid or expired state", 400);
      }
      pendingStates.delete(state);

      await this.spotifyService.handleCallback(userId, code);
      res.redirect(`${process.env.FRONTEND_URL}/settings?spotify_connected=true`);
    } catch (err) {
      console.log(err);
      res.redirect(`${process.env.FRONTEND_URL}/settings?spotify_error=connection_failed`);
    }
  };

  getStatus = async (req: Request, res: Response) => {
    try {
      const status = await this.spotifyService.getStatus(req.user!.id);
      res.json(status);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  disconnect = async (req: Request, res: Response) => {
    try {
      await this.spotifyService.disconnect(req.user!.id);
      res.status(204).send();
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
