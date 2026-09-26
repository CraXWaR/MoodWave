import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify.service.js";
import { ErrorService } from "../utils/service-error.js";
import { spotifyCallbackSchema } from "../validators/spotify.validator.js";
import { signSpotifyState, verifySpotifyState } from "../utils/spotify-state.js";
import { AiService } from "../services/ai.service.js";
import { SongSuggestion, TrackMatchResult } from "../types/spotify.interface.js";

interface SpotifyStatePayload {
  userId: string;
}

export class SpotifyController {
  private spotifyService = new SpotifyService();
  private aiService = new AiService();

  login = (req: Request, res: Response) => {
    try {
      const state = signSpotifyState({ flow: "connect", userId: req.user!.id });
      const url = this.spotifyService.getAuthUrl(state);
      res.json({ url });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  loginWithSpotify = (req: Request, res: Response) => {
    try {
      const state = signSpotifyState({ flow: "login" });
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
      const decoded = verifySpotifyState(state);

      if (decoded.flow === "login") {
        const { user, token } = await this.spotifyService.loginWithSpotify(code);
        return res.redirect(`${process.env.FRONTEND_URL}/?spotify_login_token=${token}`);
      }

      await this.spotifyService.handleCallback(decoded.userId, code);
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

  generateFromPrompt = async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
        throw new ErrorService("Prompt is required", 400);
      }

      const result = await this.handleGenerate(req.user!.id, prompt);
      res.json(result);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  generateFromMood = async (req: Request, res: Response) => {
    try {
      const { moodValue } = req.body;

      if (typeof moodValue !== "number" || moodValue < 1 || moodValue > 6) {
        throw new ErrorService("Invalid mood value", 400);
      }

      // NOTE: moodValue is the raw averaged mood from the calendar (e.g. 4.3),
      // not one of the 6 discrete mood tokens. We pass the raw number + scale
      // description straight into the Groq prompt and let it interpret it,
      // rather than rounding to a token ourselves.
      // Groq isn't the most reliable model, so this raw-number approach may
      // produce weaker results than a clean token would.
      // Possible fix if quality is an issue: have the frontend round moodValue
      // to the nearest mood id (it already has useGetMoods() with value->token
      // mapping via useGetCalendar() for today's average) and send a clean
      // { moodToken: "calm" } instead, matching generateFromPrompt's shape.
      const prompt = `Generate songs matching a mood score of ${moodValue} on a scale of 1 to 6, where 1=stressed, 2=sad, 3=burnout, 4=calm, 5=joy, 6=anxious.`;

      const result = await this.handleGenerate(req.user!.id, prompt);
      res.json(result);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  createPlaylist = async (req: Request, res: Response) => {
    try {
      const { uris, sourceText } = req.body;

      if (!Array.isArray(uris) || uris.length === 0) {
        throw new ErrorService("At least one track URI is required", 400);
      }

      if (!sourceText || typeof sourceText !== "string") {
        throw new ErrorService("Source text is required", 400);
      }

      const dateLabel = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const truncatedSourceText = sourceText.length > 30 ? `${sourceText.slice(0, 30)}...` : sourceText;

      const name = `MoodWave - ${truncatedSourceText}, ${dateLabel}`;
      const description = `Generated by MoodWaveAI based on: "${sourceText}"`;

      const accessToken = await this.spotifyService.getValidAccessToken(req.user!.id);
      const playlist = await this.spotifyService.createPlaylist(accessToken, name, description);

      res.json(playlist);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  private handleGenerate = async (userId: string, prompt: string) => {
    const aiResult = await this.aiService.generateSongSuggestions(prompt);

    if (aiResult.rejected) {
      return aiResult;
    }

    const accessToken = await this.spotifyService.getValidAccessToken(userId);
    const tracks = await this.batchSearchTracks(accessToken, aiResult.songs);

    return { rejected: false, tracks };
  };

  private batchSearchTracks = async (accessToken: string, songs: SongSuggestion[]): Promise<TrackMatchResult[]> => {
    const BATCH_SIZE = 5;
    const results: TrackMatchResult[] = [];

    for (let i = 0; i < songs.length; i += BATCH_SIZE) {
      const batch = songs.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map((song) => this.spotifyService.searchTrack(accessToken, song.title, song.artist)),
      );
      results.push(...batchResults);
    }

    return results;
  };
}
