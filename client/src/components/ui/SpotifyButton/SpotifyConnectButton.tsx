import { useEffect, useState } from "react";
import { spotifyService } from "../../../services/spotify.serive";
import { useAuth } from "../../../context/auth.context";

export function SpotifyConnectButton() {
      const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    spotifyService
      .getStatus()
      .then((status) => setConnected(status.connected))
      .catch(() => setConnected(false))
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = async () => {
    try {
      const { url } = await spotifyService.getLoginUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Failed to start Spotify connection", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await spotifyService.disconnect();
      setConnected(false);
    } catch (err) {
      console.error("Failed to disconnect Spotify", err);
    }
  };

  if (loading) return null;

  return connected ? (
    <button onClick={handleDisconnect}>Disconnect Spotify</button>
  ) : (
    <button onClick={handleConnect}>Connect Spotify</button>
  );
}
