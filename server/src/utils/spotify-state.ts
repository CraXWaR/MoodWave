import jwt from "jsonwebtoken";

type SpotifyState = { flow: "connect"; userId: string } | { flow: "login" };

export function signSpotifyState(payload: SpotifyState): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10m" });
}

export function verifySpotifyState(state: string): SpotifyState {
  return jwt.verify(state, process.env.JWT_SECRET!) as SpotifyState;
}
