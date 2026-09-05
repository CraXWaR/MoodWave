import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SpotifyService } from "../services/spotify.service.js";
import { ErrorService } from "../utils/service-error.js";
import { spotifyCallbackSchema } from "../validators/spotify.validator.js";

interface SpotifyStatePayload {
  userId: string;
}

export class SpotifyController {
  private spotifyService = new SpotifyService();

  login = (req: Request, res: Response) => {
    try {
      const state = jwt.sign({ userId: req.user!.id } as SpotifyStatePayload, process.env.JWT_SECRET as string, {
        expiresIn: "10m",
      });

      const url = this.spotifyService.getAuthUrl(state);
      res.json({ url });
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

      const payload = jwt.verify(state, process.env.JWT_SECRET as string) as SpotifyStatePayload;

      await this.spotifyService.handleCallback(payload.userId, code);

      res.redirect(`${process.env.FRONTEND_URL}/?spotify_connected=true`);
    } catch (err) {
      console.log(err);
      res.redirect(`${process.env.FRONTEND_URL}/?spotify_error=connection_failed`);
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
