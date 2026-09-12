import { api } from "./api";

interface SpotifyLoginResponse {
  url: string;
}
interface SpotifyStatusResponse {
  connected: boolean;
}
export const spotifyService = {
  getLoginUrl: (): Promise<SpotifyLoginResponse> => api.get<SpotifyLoginResponse>("/spotify/login"),
  getStatus: (): Promise<SpotifyStatusResponse> => api.get<SpotifyStatusResponse>("/spotify/status"),
  disconnect: (): Promise<void> => api.delete<void>("/spotify/disconnect"),
  getAuthLoginUrl: (): Promise<SpotifyLoginResponse> => api.get<SpotifyLoginResponse>("/spotify/login-with-spotify"),
};
