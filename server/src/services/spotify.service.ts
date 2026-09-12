import prisma from "../db/prisma.js";
import { ErrorService } from "../utils/service-error.js";
import { generateAuthToken } from "../utils/token.js";

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

interface SpotifyProfile {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  scope: string;
}

export class SpotifyService {
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      response_type: "code",
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
      scope: SCOPES,
      state,
      show_dialog: "true",
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

  private async exchangeCodeForProfile(code: string) {
    const tokenData = await this.exchangeCodeForToken(code);

    if (!tokenData.refresh_token) {
      throw new ErrorService("Spotify did not return a refresh token", 502);
    }

    const profile = await this.fetchSpotifyProfile(tokenData.access_token);
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    return {
      id: profile.id,
      email: profile.email,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt,
      scope: tokenData.scope,
    };
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

  async handleCallback(userId: string, code: string) {
    const profile = await this.exchangeCodeForProfile(code);

    const existing = await prisma.spotifyAccount.findUnique({
      where: { spotifyId: profile.id },
    });

    if (existing && existing.userId !== userId) {
      throw new ErrorService("This Spotify account is already linked to another MoodWave account", 409);
    }

    return prisma.spotifyAccount.upsert({
      where: { userId },
      update: {
        spotifyId: profile.id,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
        expiresAt: profile.expiresAt,
        scope: profile.scope,
      },
      create: {
        userId,
        spotifyId: profile.id,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
        expiresAt: profile.expiresAt,
        scope: profile.scope,
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

  async disconnect(userId: string) {
    await prisma.spotifyAccount.delete({ where: { userId } });
  }

  async getStatus(userId: string) {
    const account = await prisma.spotifyAccount.findUnique({ where: { userId } });
    return { connected: !!account };
  }

  async findOrCreateSpotifyAccount(spotifyProfile: SpotifyProfile) {
    const existingAccount = await prisma.spotifyAccount.findUnique({
      where: { spotifyId: spotifyProfile.id },
      include: { user: true },
    });

    if (existingAccount) {
      await prisma.spotifyAccount.update({
        where: { spotifyId: spotifyProfile.id },
        data: {
          accessToken: spotifyProfile.accessToken,
          refreshToken: spotifyProfile.refreshToken,
          expiresAt: spotifyProfile.expiresAt,
          scope: spotifyProfile.scope,
        },
      });

      const token = generateAuthToken(existingAccount.user.id);
      return { user: existingAccount.user, token };
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: spotifyProfile.email },
    });

    const user = await prisma.$transaction(async (tx) => {
      const targetUser =
        existingUserByEmail ??
        (await tx.user.create({
          data: { email: spotifyProfile.email, password: null },
        }));

      await tx.spotifyAccount.create({
        data: {
          userId: targetUser.id,
          spotifyId: spotifyProfile.id,
          accessToken: spotifyProfile.accessToken,
          refreshToken: spotifyProfile.refreshToken,
          expiresAt: spotifyProfile.expiresAt,
          scope: spotifyProfile.scope,
        },
      });

      return targetUser;
    });

    const token = generateAuthToken(user.id);
    return { user, token };
  }

  async loginWithSpotify(code: string) {
    const profile = await this.exchangeCodeForProfile(code);
    return this.findOrCreateSpotifyAccount(profile);
  }
}
