import jwt from "jsonwebtoken";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpotifyService } from "./spotify.service.js";

const { prismaMock, transactionMock } = vi.hoisted(() => {
  const transactionMock = {
    user: { create: vi.fn() },
    spotifyAccount: { create: vi.fn() },
  };

  const prismaMock = {
    spotifyAccount: { findUnique: vi.fn(), update: vi.fn(), upsert: vi.fn() },
    user: { findUnique: vi.fn() },
    $transaction: vi.fn(),
  };

  return { prismaMock, transactionMock };
});

vi.mock("../db/prisma.js", () => ({ default: prismaMock }));

type TransactionCallback = (transactionClient: typeof transactionMock) => Promise<unknown>;

const NOW = new Date("2026-10-10T12:00:00.000Z");
const ONE_HOUR_MS = 60 * 60 * 1000;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const ME_URL = "https://api.spotify.com/v1/me";

const tokenResponseBody = {
  access_token: "new-access-token",
  refresh_token: "new-refresh-token",
  expires_in: 3600,
  scope: "user-read-email playlist-modify-private",
  token_type: "Bearer",
};

const spotifyMeBody = { id: "spotify-user-1", email: "listener@example.com" };

const spotifyProfile = {
  id: "spotify-user-1",
  email: "listener@example.com",
  accessToken: "new-access-token",
  refreshToken: "new-refresh-token",
  expiresAt: new Date(NOW.getTime() + ONE_HOUR_MS),
  scope: "user-read-email playlist-modify-private",
};

const existingUser = {
  id: "user-1",
  email: "listener@example.com",
  password: "hashed-password",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function errorResponse(status: number) {
  return new Response("", { status });
}

function decodeUserId(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  return payload.id;
}

describe("SpotifyService", () => {
  const spotifyService = new SpotifyService();
  const fetchMock = vi.fn<typeof fetch>();

  // queues the two Spotify calls every OAuth callback makes: code -> token, then token -> profile
  function mockSuccessfulCodeExchange() {
    fetchMock.mockResolvedValueOnce(jsonResponse(tokenResponseBody)).mockResolvedValueOnce(jsonResponse(spotifyMeBody));
  }

  function requestInitOfCall(callIndex: number) {
    return fetchMock.mock.calls[callIndex]![1]!;
  }

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    vi.stubGlobal("fetch", fetchMock);
    prismaMock.$transaction.mockImplementation((callback: TransactionCallback) => callback(transactionMock));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe("getAuthUrl", () => {
    it("builds the Spotify authorize URL with client id, redirect, scopes and state", () => {
      const authUrl = new URL(spotifyService.getAuthUrl("signed-state"));

      expect(`${authUrl.origin}${authUrl.pathname}`).toBe("https://accounts.spotify.com/authorize");
      expect(authUrl.searchParams.get("client_id")).toBe(process.env.SPOTIFY_CLIENT_ID);
      expect(authUrl.searchParams.get("response_type")).toBe("code");
      expect(authUrl.searchParams.get("redirect_uri")).toBe(process.env.SPOTIFY_REDIRECT_URI);
      expect(authUrl.searchParams.get("scope")).toBe("user-read-email playlist-modify-public playlist-modify-private");
      expect(authUrl.searchParams.get("state")).toBe("signed-state");
      expect(authUrl.searchParams.get("show_dialog")).toBe("true");
    });
  });

  describe("getValidAccessToken", () => {
    it("throws 404 when the user has no Spotify account", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);

      await expect(spotifyService.getValidAccessToken("user-1")).rejects.toMatchObject({ statusCode: 404 });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("returns the stored token when it expires more than 60 seconds from now", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({
        accessToken: "stored-access-token",
        refreshToken: "stored-refresh-token",
        expiresAt: new Date(NOW.getTime() + 5 * 60 * 1000),
      });

      await expect(spotifyService.getValidAccessToken("user-1")).resolves.toBe("stored-access-token");
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("refreshes and saves a token that expires within 60 seconds", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({
        accessToken: "stored-access-token",
        refreshToken: "stored-refresh-token",
        expiresAt: new Date(NOW.getTime() + 30 * 1000),
      });
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ ...tokenResponseBody, access_token: "refreshed-access-token", refresh_token: "rotated-refresh-token" }),
      );
      prismaMock.spotifyAccount.update.mockResolvedValue({ accessToken: "refreshed-access-token" });

      await expect(spotifyService.getValidAccessToken("user-1")).resolves.toBe("refreshed-access-token");

      expect(fetchMock).toHaveBeenCalledWith(TOKEN_URL, expect.objectContaining({ method: "POST" }));
      const requestInit = requestInitOfCall(0);
      const requestBody = new URLSearchParams(String(requestInit.body));
      expect(requestBody.get("grant_type")).toBe("refresh_token");
      expect(requestBody.get("refresh_token")).toBe("stored-refresh-token");
      const expectedCredentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64");
      expect(requestInit.headers).toMatchObject({ Authorization: `Basic ${expectedCredentials}` });

      expect(prismaMock.spotifyAccount.update).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        data: {
          accessToken: "refreshed-access-token",
          refreshToken: "rotated-refresh-token",
          expiresAt: new Date(NOW.getTime() + ONE_HOUR_MS),
        },
      });
    });

    it("keeps the old refresh token when Spotify does not send a new one", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({
        accessToken: "stored-access-token",
        refreshToken: "stored-refresh-token",
        expiresAt: new Date(NOW.getTime() - 1000),
      });
      const { refresh_token: _omitted, ...tokenWithoutRefresh } = tokenResponseBody;
      fetchMock.mockResolvedValueOnce(jsonResponse(tokenWithoutRefresh));
      prismaMock.spotifyAccount.update.mockResolvedValue({ accessToken: "new-access-token" });

      await spotifyService.getValidAccessToken("user-1");

      expect(prismaMock.spotifyAccount.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ refreshToken: "stored-refresh-token" }),
        }),
      );
    });

    it("throws 502 when Spotify rejects the refresh", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({
        accessToken: "stored-access-token",
        refreshToken: "revoked-refresh-token",
        expiresAt: new Date(NOW.getTime() - 1000),
      });
      fetchMock.mockResolvedValueOnce(errorResponse(400));

      await expect(spotifyService.getValidAccessToken("user-1")).rejects.toMatchObject({ statusCode: 502 });
      expect(prismaMock.spotifyAccount.update).not.toHaveBeenCalled();
    });
  });

  describe("handleCallback (connect flow)", () => {
    it("exchanges the code and saves the Spotify account for the user", async () => {
      mockSuccessfulCodeExchange();
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);

      await spotifyService.handleCallback("user-1", "auth-code");

      const codeExchangeBody = new URLSearchParams(String(requestInitOfCall(0).body));
      expect(codeExchangeBody.get("grant_type")).toBe("authorization_code");
      expect(codeExchangeBody.get("code")).toBe("auth-code");
      expect(fetchMock).toHaveBeenNthCalledWith(2, ME_URL, {
        headers: { Authorization: "Bearer new-access-token" },
      });

      const savedFields = {
        spotifyId: "spotify-user-1",
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
        expiresAt: new Date(NOW.getTime() + ONE_HOUR_MS),
        scope: "user-read-email playlist-modify-private",
      };
      expect(prismaMock.spotifyAccount.upsert).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        update: savedFields,
        create: { userId: "user-1", ...savedFields },
      });
    });

    it("allows relinking a Spotify account that already belongs to the same user", async () => {
      mockSuccessfulCodeExchange();
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({ userId: "user-1", spotifyId: "spotify-user-1" });

      await spotifyService.handleCallback("user-1", "auth-code");

      expect(prismaMock.spotifyAccount.upsert).toHaveBeenCalledTimes(1);
    });

    it("throws 409 when the Spotify account is linked to another user", async () => {
      mockSuccessfulCodeExchange();
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({ userId: "someone-else", spotifyId: "spotify-user-1" });

      await expect(spotifyService.handleCallback("user-1", "auth-code")).rejects.toMatchObject({ statusCode: 409 });
      expect(prismaMock.spotifyAccount.upsert).not.toHaveBeenCalled();
    });

    it("throws 502 when Spotify returns no refresh token", async () => {
      const { refresh_token: _omitted, ...tokenWithoutRefresh } = tokenResponseBody;
      fetchMock.mockResolvedValueOnce(jsonResponse(tokenWithoutRefresh));

      await expect(spotifyService.handleCallback("user-1", "auth-code")).rejects.toMatchObject({ statusCode: 502 });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(prismaMock.spotifyAccount.upsert).not.toHaveBeenCalled();
    });

    it("throws 502 when the code exchange fails", async () => {
      fetchMock.mockResolvedValueOnce(errorResponse(400));

      await expect(spotifyService.handleCallback("user-1", "bad-code")).rejects.toMatchObject({ statusCode: 502 });
      expect(prismaMock.spotifyAccount.upsert).not.toHaveBeenCalled();
    });

    it("throws 502 when the profile fetch fails", async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse(tokenResponseBody)).mockResolvedValueOnce(errorResponse(401));

      await expect(spotifyService.handleCallback("user-1", "auth-code")).rejects.toMatchObject({ statusCode: 502 });
      expect(prismaMock.spotifyAccount.upsert).not.toHaveBeenCalled();
    });
  });

  describe("findOrCreateSpotifyAccount (login flow)", () => {
    it("branch 1: refreshes tokens on an existing Spotify account and logs its user in", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({
        userId: existingUser.id,
        spotifyId: "spotify-user-1",
        user: existingUser,
      });

      const result = await spotifyService.findOrCreateSpotifyAccount(spotifyProfile);

      expect(prismaMock.spotifyAccount.update).toHaveBeenCalledWith({
        where: { spotifyId: "spotify-user-1" },
        data: {
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
          expiresAt: spotifyProfile.expiresAt,
          scope: spotifyProfile.scope,
        },
      });
      expect(result.user).toBe(existingUser);
      expect(decodeUserId(result.token)).toBe("user-1");
      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it("branch 2: refuses to link by email when a user with that email already exists", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      await expect(spotifyService.findOrCreateSpotifyAccount(spotifyProfile)).rejects.toMatchObject({ statusCode: 409 });

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: "listener@example.com" } });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it("branch 3: creates a passwordless user and their Spotify account together", async () => {
      const newUser = { id: "user-new", email: "listener@example.com", password: null };
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);
      transactionMock.user.create.mockResolvedValue(newUser);

      const result = await spotifyService.findOrCreateSpotifyAccount(spotifyProfile);

      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
      expect(transactionMock.user.create).toHaveBeenCalledWith({
        data: { email: "listener@example.com", password: null },
      });
      expect(transactionMock.spotifyAccount.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ userId: "user-new", spotifyId: "spotify-user-1" }),
      });
      expect(result.user).toBe(newUser);
      expect(decodeUserId(result.token)).toBe("user-new");
    });
  });

  describe("loginWithSpotify", () => {
    it("exchanges the code, then finds or creates the account from the Spotify profile", async () => {
      const newUser = { id: "user-new", email: "listener@example.com", password: null };
      mockSuccessfulCodeExchange();
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);
      transactionMock.user.create.mockResolvedValue(newUser);

      const result = await spotifyService.loginWithSpotify("auth-code");

      expect(transactionMock.spotifyAccount.create).toHaveBeenCalledWith({
        data: {
          userId: "user-new",
          spotifyId: "spotify-user-1",
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
          expiresAt: new Date(NOW.getTime() + ONE_HOUR_MS),
          scope: "user-read-email playlist-modify-private",
        },
      });
      expect(decodeUserId(result.token)).toBe("user-new");
    });
  });

  describe("searchTrack", () => {
    beforeEach(() => {
      // failure paths log on purpose; keep the test output clean
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    it("searches with the combined title and artist, limited to one track", async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ tracks: { items: [] } }));

      await spotifyService.searchTrack("access-token", "Weightless", "Marconi Union");

      const requestedUrl = new URL(String(fetchMock.mock.calls[0]![0]));
      expect(`${requestedUrl.origin}${requestedUrl.pathname}`).toBe("https://api.spotify.com/v1/search");
      expect(requestedUrl.searchParams.get("q")).toBe("Weightless Marconi Union");
      expect(requestedUrl.searchParams.get("type")).toBe("track");
      expect(requestedUrl.searchParams.get("limit")).toBe("1");
      expect(requestInitOfCall(0).headers).toEqual({ Authorization: "Bearer access-token" });
    });

    it("maps the first result to a matched track", async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          tracks: {
            items: [
              {
                name: "Weightless",
                uri: "spotify:track:abc123",
                artists: [{ name: "Marconi Union" }, { name: "Featured Artist" }],
                album: { images: [{ url: "https://i.scdn.co/large.jpg" }, { url: "https://i.scdn.co/small.jpg" }] },
              },
            ],
          },
        }),
      );

      await expect(spotifyService.searchTrack("access-token", "weightless", "marconi union")).resolves.toEqual({
        matched: true,
        title: "Weightless",
        artist: "Marconi Union",
        spotifyUri: "spotify:track:abc123",
        albumImageUrl: "https://i.scdn.co/large.jpg",
      });
    });

    it("falls back to the suggested artist and a null image when Spotify omits them", async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ tracks: { items: [{ name: "Weightless", uri: "spotify:track:abc123", album: { images: [] } }] } }),
      );

      await expect(spotifyService.searchTrack("access-token", "Weightless", "Marconi Union")).resolves.toMatchObject({
        matched: true,
        artist: "Marconi Union",
        albumImageUrl: null,
      });
    });

    it("returns unmatched when the search has no results", async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ tracks: { items: [] } }));

      await expect(spotifyService.searchTrack("access-token", "Made Up Song", "Nobody")).resolves.toEqual({
        matched: false,
        title: "Made Up Song",
        artist: "Nobody",
      });
    });

    it("returns unmatched instead of throwing when Spotify responds with an error", async () => {
      fetchMock.mockResolvedValueOnce(errorResponse(429));

      await expect(spotifyService.searchTrack("access-token", "Weightless", "Marconi Union")).resolves.toEqual({
        matched: false,
        title: "Weightless",
        artist: "Marconi Union",
      });
    });

    it("returns unmatched instead of throwing when the request itself fails", async () => {
      fetchMock.mockRejectedValueOnce(new TypeError("fetch failed"));

      await expect(spotifyService.searchTrack("access-token", "Weightless", "Marconi Union")).resolves.toEqual({
        matched: false,
        title: "Weightless",
        artist: "Marconi Union",
      });
    });
  });

  describe("createPlaylist", () => {
    it("creates a private playlist and maps the response", async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({
          id: "playlist-1",
          name: "MoodWave - rainy day, Oct 10",
          external_urls: { spotify: "https://open.spotify.com/playlist/playlist-1" },
        }),
      );

      const playlist = await spotifyService.createPlaylist("access-token", "MoodWave - rainy day, Oct 10", "description");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/me/playlists",
        expect.objectContaining({ method: "POST" }),
      );
      const requestInit = requestInitOfCall(0);
      expect(requestInit.headers).toMatchObject({ Authorization: "Bearer access-token" });
      expect(JSON.parse(String(requestInit.body))).toEqual({
        name: "MoodWave - rainy day, Oct 10",
        description: "description",
        public: false,
      });
      expect(playlist).toEqual({
        id: "playlist-1",
        name: "MoodWave - rainy day, Oct 10",
        externalUrl: "https://open.spotify.com/playlist/playlist-1",
      });
    });

    it("throws 502 when Spotify rejects the playlist", async () => {
      fetchMock.mockResolvedValueOnce(errorResponse(403));

      await expect(spotifyService.createPlaylist("access-token", "name", "description")).rejects.toMatchObject({
        statusCode: 502,
      });
    });
  });

  describe("addTracksToPlaylist", () => {
    it("posts the track URIs to the playlist items endpoint", async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ snapshot_id: "snapshot-1" }, 201));
      const uris = ["spotify:track:one", "spotify:track:two"];

      await spotifyService.addTracksToPlaylist("access-token", "playlist-1", uris);

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/playlists/playlist-1/items",
        expect.objectContaining({ method: "POST" }),
      );
      expect(JSON.parse(String(requestInitOfCall(0).body))).toEqual({ uris });
    });

    it("throws 502 when Spotify rejects the tracks", async () => {
      fetchMock.mockResolvedValueOnce(errorResponse(400));

      await expect(spotifyService.addTracksToPlaylist("access-token", "playlist-1", ["spotify:track:one"])).rejects.toMatchObject(
        { statusCode: 502 },
      );
    });
  });

  describe("getStatus", () => {
    it("reports connected when the user has a Spotify account", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue({ userId: "user-1" });

      await expect(spotifyService.getStatus("user-1")).resolves.toEqual({ connected: true });
    });

    it("reports disconnected when the user has no Spotify account", async () => {
      prismaMock.spotifyAccount.findUnique.mockResolvedValue(null);

      await expect(spotifyService.getStatus("user-1")).resolves.toEqual({ connected: false });
    });
  });
});
