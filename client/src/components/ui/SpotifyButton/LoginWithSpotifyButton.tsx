import { useState } from "react";
import { spotifyService } from "../../../services/spotify.serive";

export function LoginWithSpotifyButton() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await spotifyService.getAuthLoginUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Failed to start Spotify login", err);
      setError("Couldn't start Spotify login. Try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Redirecting..." : "Login with Spotify"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
