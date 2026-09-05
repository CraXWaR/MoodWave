import prisma from "../db/prisma.js";
import { ErrorService } from "../utils/service-error.js";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_ME_URL = "https://api.spotify.com/v1/me";

const SCOPES = ["user-read-email", "playlist-modify-public", "playlist-modify-private"].join(" ");

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface SpotifyMeResponse {
  id: string;
  email: string;
}

export class SpotifyService {
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      response_type: "code",
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
      scope: SCOPES,
      state,
    });

    return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
  }

  private async exchangeCodeForToken(code: string): Promise<SpotifyTokenResponse> {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    });

    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
      "base64",
    );

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new ErrorService("Failed to exchange Spotify code for token", 502);
    }

    return response.json();
  }

  private async fetchSpotifyProfile(accessToken: string): Promise<SpotifyMeResponse> {
    const response = await fetch(SPOTIFY_ME_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new ErrorService("Failed to fetch Spotify profile", 502);
    }

    return response.json();
  }

  async handleCallback(userId: string, code: string) {
    const tokenData = await this.exchangeCodeForToken(code);
    const profile = await this.fetchSpotifyProfile(tokenData.access_token);

    if (!tokenData.refresh_token) {
      throw new ErrorService("Spotify did not return a refresh token", 502);
    }

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    return prisma.spotifyAccount.upsert({
      where: { userId },
      update: {
        spotifyId: profile.id,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt,
        scope: tokenData.scope,
      },
      create: {
        userId,
        spotifyId: profile.id,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt,
        scope: tokenData.scope,
      },
    });
  }

  async getValidAccessToken(userId: string) {
    const account = await prisma.spotifyAccount.findUnique({ where: { userId } });
    if (!account) {
      throw new ErrorService("Spotify account not connected", 404);
    }

    if (account.expiresAt.getTime() > Date.now() + 60_000) {
      return account.accessToken;
    }

    return this.refreshAccessToken(userId, account.refreshToken);
  }

  private async refreshAccessToken(userId: string, refreshToken: string) {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
      "base64",
    );

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new ErrorService("Failed to refresh Spotify token", 502);
    }

    const tokenData: SpotifyTokenResponse = await response.json();
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    const updated = await prisma.spotifyAccount.update({
      where: { userId },
      data: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token ?? refreshToken,
        expiresAt,
      },
    });

    return updated.accessToken;
  }

  async disconnect(userId: string) {
    await prisma.spotifyAccount.delete({ where: { userId } });
  }

  async getStatus(userId: string) {
    const account = await prisma.spotifyAccount.findUnique({ where: { userId } });
    return { connected: !!account };
  }
}
