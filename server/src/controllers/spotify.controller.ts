import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify.service.js";
import { ErrorService } from "../utils/service-error.js";
import { spotifyCallbackSchema } from "../validators/spotify.validator.js";
import { signSpotifyState, verifySpotifyState } from "../utils/spotify-state.js";
import { AiService } from "../services/ai.service.js";
import { SongSuggestion, TrackMatchResult } from "../types/spotify.interface.js";

type SpotifyState = ReturnType<typeof verifySpotifyState>;

export class SpotifyController {
  private spotifyService = new SpotifyService();
  private aiService = new AiService();

  login = (req: Request, res: Response) => {
    try {
      const state = signSpotifyState({ flow: "connect", userId: req.user.id });
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
    // decoded up front so every outcome, errors included, returns the user to the page the flow started on
    const decodedState = this.decodeStateSafely(req.query.state);
    const returnUrl = this.getCallbackReturnUrl(decodedState);

    if (req.query.error) {
      return res.redirect(`${returnUrl}?spotify_error=access_denied`);
    }

    const parsed = spotifyCallbackSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.redirect(`${returnUrl}?spotify_error=invalid_callback`);
    }

    if (!decodedState) {
      return res.redirect(`${returnUrl}?spotify_error=invalid_state`);
    }

    try {
      const { code } = parsed.data;

      if (decodedState.flow === "login") {
        const { token } = await this.spotifyService.loginWithSpotify(code);
        // fragment, not query: browsers never send it to servers or in the Referer header
        return res.redirect(`${process.env.FRONTEND_URL}/#spotify_login_token=${token}`);
      }

      await this.spotifyService.handleCallback(decodedState.userId, code);
      res.redirect(`${returnUrl}?spotify_connected=true`);
    } catch (err) {
      // 409 means a conflicting account: in login, the email is taken; in connect, the Spotify account is
      const isConflict = err instanceof ErrorService && err.statusCode === 409;
      const conflictCode = decodedState.flow === "login" ? "email_in_use" : "already_linked";
      res.redirect(`${returnUrl}?spotify_error=${isConflict ? conflictCode : "connection_failed"}`);
    }
  };

  // a forged, expired or missing state decodes to null instead of throwing
  private decodeStateSafely = (state: unknown): SpotifyState | null => {
    if (typeof state !== "string" || state.length === 0) return null;

    try {
      return verifySpotifyState(state);
    } catch {
      return null;
    }
  };

  private getCallbackReturnUrl = (decodedState: SpotifyState | null): string => {
    if (decodedState?.flow === "connect") return `${process.env.FRONTEND_URL}/profile`;
    if (decodedState?.flow === "login") return `${process.env.FRONTEND_URL}/login`;
    return `${process.env.FRONTEND_URL}/`;
  };

  getStatus = async (req: Request, res: Response) => {
    try {
      const status = await this.spotifyService.getStatus(req.user.id);
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
      await this.spotifyService.disconnect(req.user.id);
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

      const result = await this.handleGenerate(req.user.id, prompt);
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

      const result = await this.handleGenerate(req.user.id, prompt);
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

      const accessToken = await this.spotifyService.getValidAccessToken(req.user.id);
      const playlist = await this.spotifyService.createPlaylist(accessToken, name, description);

      try {
        await this.addTracksWithRetry(accessToken, playlist.id, uris);
      } catch {
        // the playlist exists but is empty: hand it back so the client resumes into it
        // through addTracksToPlaylist instead of creating a duplicate
        return res.status(502).json({
          error: "Your playlist was created, but the songs couldn't be added. Try saving again.",
          playlist,
        });
      }

      res.json(playlist);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  addTracksToPlaylist = async (req: Request<{ playlistId: string }>, res: Response) => {
    try {
      const { playlistId } = req.params;
      const { uris } = req.body;

      // the id ends up in a Spotify URL path, so only allow Spotify's base62 ids
      if (!/^[A-Za-z0-9]+$/.test(playlistId)) {
        throw new ErrorService("Invalid playlist id", 400);
      }

      if (!Array.isArray(uris) || uris.length === 0) {
        throw new ErrorService("At least one track URI is required", 400);
      }

      const accessToken = await this.spotifyService.getValidAccessToken(req.user.id);
      await this.addTracksWithRetry(accessToken, playlistId, uris);

      res.status(204).send();
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  // Spotify sometimes fails transiently (429 / 5xx), so try a few times with a growing pause
  private addTracksWithRetry = async (accessToken: string, playlistId: string, uris: string[]): Promise<void> => {
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY_MS = 500;

    for (let attempt = 1; ; attempt++) {
      try {
        await this.spotifyService.addTracksToPlaylist(accessToken, playlistId, uris);
        return;
      } catch (err) {
        if (attempt >= MAX_ATTEMPTS) throw err;
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      }
    }
  };

  private handleGenerate = async (userId: string, prompt: string) => {
    const aiResult = await this.aiService.generateSongSuggestions(prompt);

    if (aiResult.rejected) {
      return aiResult;
    }

    const songs = this.pickPlaylistSongs(aiResult.songs, aiResult.avoidArtists);
    if (songs.length === 0) {
      throw new ErrorService("Couldn't find songs that fit, try rephrasing your prompt", 502);
    }

    const accessToken = await this.spotifyService.getValidAccessToken(userId);
    const tracks = await this.batchSearchTracks(accessToken, songs);

    return { rejected: false, tracks };
  };

  // Enforces in code what the prompt only asks for: no excluded artists, at most 2 songs per artist, 10 songs
  private pickPlaylistSongs = (songs: SongSuggestion[], avoidArtists: string[]): SongSuggestion[] => {
    const PLAYLIST_SIZE = 10;
    const MAX_SONGS_PER_ARTIST = 2;

    // whole-word, case-insensitive: "metallica" also catches "Metallica & San Francisco Symphony"
    const avoidPatterns = avoidArtists.map((artist) => {
      const escapedArtist = artist.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // lookarounds instead of \b, which never matches next to punctuation like "Sunn O)))"
      return new RegExp(`(?<!\\w)${escapedArtist}(?!\\w)`, "i");
    });

    const songCountByArtist = new Map<string, number>();
    const pickedSongs: SongSuggestion[] = [];

    for (const song of songs) {
      if (pickedSongs.length === PLAYLIST_SIZE) break;
      if (avoidPatterns.some((pattern) => pattern.test(song.artist))) continue;

      const artistKey = song.artist.trim().toLowerCase();
      const artistSongCount = songCountByArtist.get(artistKey) ?? 0;
      if (artistSongCount >= MAX_SONGS_PER_ARTIST) continue;

      songCountByArtist.set(artistKey, artistSongCount + 1);
      pickedSongs.push(song);
    }

    return pickedSongs;
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
