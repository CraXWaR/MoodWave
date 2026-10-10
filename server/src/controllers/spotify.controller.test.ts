import jwt from "jsonwebtoken";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import app from "../app.js";
import { ErrorService } from "../utils/service-error.js";
import { signSpotifyState, verifySpotifyState } from "../utils/spotify-state.js";
import { generateAuthToken } from "../utils/token.js";

const { spotifyServiceMock, aiServiceMock } = vi.hoisted(() => ({
  spotifyServiceMock: {
    getAuthUrl: vi.fn(),
    handleCallback: vi.fn(),
    loginWithSpotify: vi.fn(),
    getStatus: vi.fn(),
    disconnect: vi.fn(),
    getValidAccessToken: vi.fn(),
    searchTrack: vi.fn(),
    createPlaylist: vi.fn(),
    addTracksToPlaylist: vi.fn(),
  },
  aiServiceMock: {
    generateSongSuggestions: vi.fn(),
    detectEmotion: vi.fn(),
  },
}));

// controllers build their services with `new`; every instance is the shared mock
vi.mock("../services/spotify.service.js", () => ({
  SpotifyService: function SpotifyService() {
    return spotifyServiceMock;
  },
}));
vi.mock("../services/ai.service.js", () => ({
  AiService: function AiService() {
    return aiServiceMock;
  },
}));
// loading app pulls in every service; never create a real pg pool
vi.mock("../db/prisma.js", () => ({ default: {} }));

const FRONTEND_URL = "http://localhost:5173";
const authHeader = `Bearer ${generateAuthToken("user-1")}`;

function buildSongs(count: number) {
  return Array.from({ length: count }, (_, i) => ({ title: `Song ${i + 1}`, artist: `Artist ${i + 1}` }));
}

describe("SpotifyController routes", () => {
  describe("GET /api/spotify/callback", () => {
    it("redirects with access_denied when the user declines on Spotify", async () => {
      const response = await request(app).get("/api/spotify/callback?error=access_denied&state=anything");

      expect(response.status).toBe(302);
      // TODO: /settings does not exist on the client yet (open bug, see roadmap)
      expect(response.headers.location).toBe(`${FRONTEND_URL}/settings?spotify_error=access_denied`);
    });

    it.each([
      ["code", "/api/spotify/callback?state=signed-state"],
      ["state", "/api/spotify/callback?code=auth-code"],
    ])("redirects with invalid_callback when %s is missing", async (_missingField, path) => {
      const response = await request(app).get(path);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(`${FRONTEND_URL}/settings?spotify_error=invalid_callback`);
      expect(spotifyServiceMock.handleCallback).not.toHaveBeenCalled();
      expect(spotifyServiceMock.loginWithSpotify).not.toHaveBeenCalled();
    });

    it("connect flow: links Spotify to the user in the state and redirects with spotify_connected", async () => {
      const state = signSpotifyState({ flow: "connect", userId: "user-1" });

      const response = await request(app).get("/api/spotify/callback").query({ code: "auth-code", state });

      expect(spotifyServiceMock.handleCallback).toHaveBeenCalledWith("user-1", "auth-code");
      expect(spotifyServiceMock.loginWithSpotify).not.toHaveBeenCalled();
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(`${FRONTEND_URL}/?spotify_connected=true`);
    });

    it("login flow: logs in with Spotify and puts the token in the URL fragment", async () => {
      spotifyServiceMock.loginWithSpotify.mockResolvedValue({ user: { id: "user-1" }, token: "app-jwt" });
      const state = signSpotifyState({ flow: "login" });

      const response = await request(app).get("/api/spotify/callback").query({ code: "auth-code", state });

      expect(spotifyServiceMock.loginWithSpotify).toHaveBeenCalledWith("auth-code");
      expect(spotifyServiceMock.handleCallback).not.toHaveBeenCalled();
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(`${FRONTEND_URL}/#spotify_login_token=app-jwt`);
    });

    it("rejects a state signed with a different secret", async () => {
      const forgedState = jwt.sign({ flow: "connect", userId: "victim" }, "attacker-secret");

      const response = await request(app).get("/api/spotify/callback").query({ code: "auth-code", state: forgedState });

      expect(response.headers.location).toBe(`${FRONTEND_URL}/?spotify_error=connection_failed`);
      expect(spotifyServiceMock.handleCallback).not.toHaveBeenCalled();
    });

    it("rejects an expired state", async () => {
      const expiredState = jwt.sign(
        { flow: "connect", userId: "user-1", exp: Math.floor(Date.now() / 1000) - 60 },
        "test-jwt-secret",
      );

      const response = await request(app).get("/api/spotify/callback").query({ code: "auth-code", state: expiredState });

      expect(response.headers.location).toBe(`${FRONTEND_URL}/?spotify_error=connection_failed`);
      expect(spotifyServiceMock.handleCallback).not.toHaveBeenCalled();
    });

    it("redirects with connection_failed when the service throws", async () => {
      spotifyServiceMock.handleCallback.mockRejectedValue(new ErrorService("Already linked", 409));
      const state = signSpotifyState({ flow: "connect", userId: "user-1" });

      const response = await request(app).get("/api/spotify/callback").query({ code: "auth-code", state });

      expect(response.headers.location).toBe(`${FRONTEND_URL}/?spotify_error=connection_failed`);
    });
  });

  describe("GET /api/spotify/login", () => {
    it("returns 401 without a token", async () => {
      const response = await request(app).get("/api/spotify/login");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "Unauthorized" });
      expect(spotifyServiceMock.getAuthUrl).not.toHaveBeenCalled();
    });

    it("returns the auth URL built from a connect state for the current user", async () => {
      spotifyServiceMock.getAuthUrl.mockReturnValue("https://accounts.spotify.com/authorize?mock");

      const response = await request(app).get("/api/spotify/login").set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ url: "https://accounts.spotify.com/authorize?mock" });
      const signedState = spotifyServiceMock.getAuthUrl.mock.calls[0]![0] as string;
      expect(verifySpotifyState(signedState)).toMatchObject({ flow: "connect", userId: "user-1" });
    });
  });

  describe("GET /api/spotify/login-with-spotify", () => {
    it("is public and signs a login state without a user id", async () => {
      spotifyServiceMock.getAuthUrl.mockReturnValue("https://accounts.spotify.com/authorize?mock");

      const response = await request(app).get("/api/spotify/login-with-spotify");

      expect(response.status).toBe(200);
      const signedState = spotifyServiceMock.getAuthUrl.mock.calls[0]![0] as string;
      const decodedState = verifySpotifyState(signedState);
      expect(decodedState).toMatchObject({ flow: "login" });
      expect(decodedState).not.toHaveProperty("userId");
    });
  });

  describe("GET /api/spotify/status and DELETE /api/spotify/disconnect", () => {
    it("returns the connection status for the current user", async () => {
      spotifyServiceMock.getStatus.mockResolvedValue({ connected: true });

      const response = await request(app).get("/api/spotify/status").set("Authorization", authHeader);

      expect(spotifyServiceMock.getStatus).toHaveBeenCalledWith("user-1");
      expect(response.body).toEqual({ connected: true });
    });

    it("maps an ErrorService to its status and message", async () => {
      spotifyServiceMock.getStatus.mockRejectedValue(new ErrorService("Not allowed", 403));

      const response = await request(app).get("/api/spotify/status").set("Authorization", authHeader);

      expect(response.status).toBe(403);
      expect(response.body).toEqual({ error: "Not allowed" });
    });

    it("maps any other error to a generic 500", async () => {
      spotifyServiceMock.getStatus.mockRejectedValue(new Error("database is down"));

      const response = await request(app).get("/api/spotify/status").set("Authorization", authHeader);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Something went wrong" });
    });

    it("disconnects the current user and responds 204", async () => {
      const response = await request(app).delete("/api/spotify/disconnect").set("Authorization", authHeader);

      expect(spotifyServiceMock.disconnect).toHaveBeenCalledWith("user-1");
      expect(response.status).toBe(204);
    });
  });

  describe("POST /api/spotify/playlist/generate/prompt", () => {
    it("returns 401 without a token", async () => {
      const response = await request(app).post("/api/spotify/playlist/generate/prompt").send({ prompt: "rainy day" });

      expect(response.status).toBe(401);
      expect(aiServiceMock.generateSongSuggestions).not.toHaveBeenCalled();
    });

    it.each([
      ["missing", {}],
      ["blank", { prompt: "   " }],
      ["not a string", { prompt: 42 }],
    ])("returns 400 when the prompt is %s", async (_description, body) => {
      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Prompt is required" });
      expect(aiServiceMock.generateSongSuggestions).not.toHaveBeenCalled();
    });

    it("passes a rejected AI result straight through without touching Spotify", async () => {
      const rejection = { rejected: true, message: "Try describing a mood or feeling." };
      aiServiceMock.generateSongSuggestions.mockResolvedValue(rejection);

      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send({ prompt: "what is the capital of France" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rejection);
      expect(spotifyServiceMock.getValidAccessToken).not.toHaveBeenCalled();
      expect(spotifyServiceMock.searchTrack).not.toHaveBeenCalled();
    });

    it("fetches the access token once and returns matched tracks in suggestion order", async () => {
      const songs = buildSongs(3);
      aiServiceMock.generateSongSuggestions.mockResolvedValue({ rejected: false, songs });
      spotifyServiceMock.getValidAccessToken.mockResolvedValue("access-token");
      spotifyServiceMock.searchTrack.mockImplementation(async (_accessToken: string, title: string, artist: string) => ({
        matched: false,
        title,
        artist,
      }));

      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send({ prompt: "rainy sunday" });

      expect(aiServiceMock.generateSongSuggestions).toHaveBeenCalledWith("rainy sunday");
      expect(spotifyServiceMock.getValidAccessToken).toHaveBeenCalledTimes(1);
      expect(spotifyServiceMock.getValidAccessToken).toHaveBeenCalledWith("user-1");
      expect(spotifyServiceMock.searchTrack).toHaveBeenCalledWith("access-token", "Song 1", "Artist 1");
      expect(response.body).toEqual({
        rejected: false,
        tracks: songs.map((song) => ({ matched: false, ...song })),
      });
    });

    it("never runs more than 5 Spotify searches at once", async () => {
      const songs = buildSongs(12);
      let activeSearches = 0;
      let maxActiveSearches = 0;
      aiServiceMock.generateSongSuggestions.mockResolvedValue({ rejected: false, songs });
      spotifyServiceMock.getValidAccessToken.mockResolvedValue("access-token");
      spotifyServiceMock.searchTrack.mockImplementation(async (_accessToken: string, title: string, artist: string) => {
        activeSearches++;
        maxActiveSearches = Math.max(maxActiveSearches, activeSearches);
        await new Promise((r) => setTimeout(r, 5));
        activeSearches--;
        return { matched: false, title, artist };
      });

      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send({ prompt: "rainy sunday" });

      expect(spotifyServiceMock.searchTrack).toHaveBeenCalledTimes(12);
      expect(maxActiveSearches).toBe(5);
      expect(response.body.tracks.map((track: { title: string }) => track.title)).toEqual(songs.map((song) => song.title));
    });

    it("returns the service error when Spotify is not connected", async () => {
      aiServiceMock.generateSongSuggestions.mockResolvedValue({ rejected: false, songs: buildSongs(1) });
      spotifyServiceMock.getValidAccessToken.mockRejectedValue(new ErrorService("Spotify account not connected", 404));

      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send({ prompt: "rainy sunday" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Spotify account not connected" });
    });

    it("returns 502 when Groq fails", async () => {
      aiServiceMock.generateSongSuggestions.mockRejectedValue(
        new ErrorService("Failed to generate songs, please try again", 502),
      );

      const response = await request(app)
        .post("/api/spotify/playlist/generate/prompt")
        .set("Authorization", authHeader)
        .send({ prompt: "rainy sunday" });

      expect(response.status).toBe(502);
    });
  });

  describe("POST /api/spotify/playlist/generate/mood", () => {
    it.each([
      ["a string", { moodValue: "4" }],
      ["below 1", { moodValue: 0 }],
      ["above 6", { moodValue: 7 }],
      ["missing", {}],
    ])("returns 400 when the mood value is %s", async (_description, body) => {
      const response = await request(app)
        .post("/api/spotify/playlist/generate/mood")
        .set("Authorization", authHeader)
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Invalid mood value" });
    });

    it.each([1, 6])("accepts the boundary value %d", async (moodValue) => {
      aiServiceMock.generateSongSuggestions.mockResolvedValue({ rejected: true, message: "nope" });

      const response = await request(app)
        .post("/api/spotify/playlist/generate/mood")
        .set("Authorization", authHeader)
        .send({ moodValue });

      expect(response.status).toBe(200);
    });

    it("passes the raw averaged score into the Groq prompt", async () => {
      aiServiceMock.generateSongSuggestions.mockResolvedValue({ rejected: true, message: "nope" });

      await request(app)
        .post("/api/spotify/playlist/generate/mood")
        .set("Authorization", authHeader)
        .send({ moodValue: 4.3 });

      expect(aiServiceMock.generateSongSuggestions).toHaveBeenCalledWith(
        "Generate songs matching a mood score of 4.3 on a scale of 1 to 6, where 1=stressed, 2=sad, 3=burnout, 4=calm, 5=joy, 6=anxious.",
      );
    });
  });

  describe("POST /api/spotify/playlist/create", () => {
    const createdPlaylist = {
      id: "playlist1",
      name: "MoodWave - rainy sunday, Oct 10",
      externalUrl: "https://open.spotify.com/playlist/playlist1",
    };
    const uris = ["spotify:track:one", "spotify:track:two"];

    beforeEach(() => {
      // only Date: the retry waits on real timers
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(new Date("2026-10-10T12:00:00.000Z"));
      spotifyServiceMock.getValidAccessToken.mockResolvedValue("access-token");
      spotifyServiceMock.createPlaylist.mockResolvedValue(createdPlaylist);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it.each([
      ["missing", { sourceText: "rainy sunday" }],
      ["empty", { uris: [], sourceText: "rainy sunday" }],
      ["not an array", { uris: "spotify:track:one", sourceText: "rainy sunday" }],
    ])("returns 400 when uris is %s", async (_description, body) => {
      const response = await request(app).post("/api/spotify/playlist/create").set("Authorization", authHeader).send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "At least one track URI is required" });
      expect(spotifyServiceMock.createPlaylist).not.toHaveBeenCalled();
    });

    it("returns 400 when sourceText is missing", async () => {
      const response = await request(app).post("/api/spotify/playlist/create").set("Authorization", authHeader).send({ uris });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Source text is required" });
    });

    it("names the playlist after the source text and date, then adds the tracks with the same token", async () => {
      const response = await request(app)
        .post("/api/spotify/playlist/create")
        .set("Authorization", authHeader)
        .send({ uris, sourceText: "rainy sunday" });

      expect(spotifyServiceMock.createPlaylist).toHaveBeenCalledWith(
        "access-token",
        "MoodWave - rainy sunday, Oct 10",
        'Generated by MoodWaveAI based on: "rainy sunday"',
      );
      expect(spotifyServiceMock.addTracksToPlaylist).toHaveBeenCalledWith("access-token", "playlist1", uris);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdPlaylist);
    });

    it("keeps a 30 character source text whole in the name", async () => {
      await request(app)
        .post("/api/spotify/playlist/create")
        .set("Authorization", authHeader)
        .send({ uris, sourceText: "slow morning coffee and a long" });

      expect(spotifyServiceMock.createPlaylist).toHaveBeenCalledWith(
        "access-token",
        "MoodWave - slow morning coffee and a long, Oct 10",
        expect.any(String),
      );
    });

    it("truncates a longer source text to 30 characters in the name but not the description", async () => {
      const sourceText = "slow morning coffee and a long walk by the river";

      await request(app).post("/api/spotify/playlist/create").set("Authorization", authHeader).send({ uris, sourceText });

      expect(spotifyServiceMock.createPlaylist).toHaveBeenCalledWith(
        "access-token",
        "MoodWave - slow morning coffee and a long..., Oct 10",
        `Generated by MoodWaveAI based on: "${sourceText}"`,
      );
    });

    it("retries adding tracks after a transient failure", async () => {
      spotifyServiceMock.addTracksToPlaylist
        .mockRejectedValueOnce(new ErrorService("Failed to add tracks to Spotify playlist", 502))
        .mockResolvedValueOnce(undefined);

      const response = await request(app)
        .post("/api/spotify/playlist/create")
        .set("Authorization", authHeader)
        .send({ uris, sourceText: "rainy sunday" });

      expect(spotifyServiceMock.addTracksToPlaylist).toHaveBeenCalledTimes(2);
      expect(spotifyServiceMock.createPlaylist).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdPlaylist);
    });

    it("returns 502 with the created playlist after 3 failed attempts so the client can resume", async () => {
      spotifyServiceMock.addTracksToPlaylist.mockRejectedValue(
        new ErrorService("Failed to add tracks to Spotify playlist", 502),
      );

      const response = await request(app)
        .post("/api/spotify/playlist/create")
        .set("Authorization", authHeader)
        .send({ uris, sourceText: "rainy sunday" });

      expect(spotifyServiceMock.addTracksToPlaylist).toHaveBeenCalledTimes(3);
      expect(response.status).toBe(502);
      expect(response.body).toEqual({
        error: "Your playlist was created, but the songs couldn't be added. Try saving again.",
        playlist: createdPlaylist,
      });
    });
  });

  describe("POST /api/spotify/playlist/:playlistId/tracks", () => {
    const uris = ["spotify:track:one"];

    it("returns 401 without a token", async () => {
      const response = await request(app).post("/api/spotify/playlist/playlist1/tracks").send({ uris });

      expect(response.status).toBe(401);
    });

    it("returns 400 for a playlist id that is not a Spotify id", async () => {
      const response = await request(app)
        .post("/api/spotify/playlist/not-a-spotify-id/tracks")
        .set("Authorization", authHeader)
        .send({ uris });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Invalid playlist id" });
      expect(spotifyServiceMock.addTracksToPlaylist).not.toHaveBeenCalled();
    });

    it("returns 400 when uris is empty", async () => {
      const response = await request(app)
        .post("/api/spotify/playlist/playlist1/tracks")
        .set("Authorization", authHeader)
        .send({ uris: [] });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "At least one track URI is required" });
    });

    it("adds the tracks to the existing playlist without creating a new one", async () => {
      spotifyServiceMock.getValidAccessToken.mockResolvedValue("access-token");

      const response = await request(app)
        .post("/api/spotify/playlist/playlist1/tracks")
        .set("Authorization", authHeader)
        .send({ uris });

      expect(spotifyServiceMock.getValidAccessToken).toHaveBeenCalledWith("user-1");
      expect(spotifyServiceMock.addTracksToPlaylist).toHaveBeenCalledWith("access-token", "playlist1", uris);
      expect(spotifyServiceMock.createPlaylist).not.toHaveBeenCalled();
      expect(response.status).toBe(204);
    });
  });
});
