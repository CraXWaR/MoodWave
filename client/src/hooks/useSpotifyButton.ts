import { useEffect, useState } from "react";
import { spotifyService } from "../services/spotify.serive";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/auth.context";

type ConnectionStatus = "checking" | "connected" | "disconnected";

// Handles the redirect back from Spotify after the login flow completes —
// reads the token from the URL, fetches the user, logs them in, cleans the URL.
function useLoginRedirectEffect(
  setAuthUser: ReturnType<typeof useAuth>["setAuthUser"],
  setError: (error: string | null) => void,
) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const spotifyLoginToken = params.get("spotify_login_token");

    if (!spotifyLoginToken) return;

    authService
      .getMe(spotifyLoginToken)
      .then((user) => {
        setAuthUser({ token: spotifyLoginToken, user });
      })
      .catch((err) => {
        console.error("Spotify login redirect failed", err);
        setError("Couldn't complete Spotify login. Try again.");
      })
      .finally(() => {
        params.delete("spotify_login_token");
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
        window.history.replaceState({}, "", newUrl);
      });
  }, []);
}

// Checks whether the current logged-in user has a linked Spotify account.
function useConnectionStatusEffect(
  user: ReturnType<typeof useAuth>["user"],
  setStatus: (status: ConnectionStatus) => void,
) {
  useEffect(() => {
    if (!user) {
      setStatus("disconnected");
      return;
    }

    setStatus("checking");
    spotifyService
      .getStatus()
      .then((res) => setStatus(res.connected ? "connected" : "disconnected"))
      .catch(() => setStatus("disconnected"));
  }, [user]);
}

export function useSpotify() {
  const { user, setAuthUser } = useAuth();
  const [status, setStatus] = useState<ConnectionStatus>(user ? "checking" : "disconnected");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useLoginRedirectEffect(setAuthUser, setError);
  useConnectionStatusEffect(user, setStatus);

  const handleClick = async () => {
    setError(null);
    setActionLoading(true);

    try {
      if (!user) {
        const { url } = await spotifyService.getAuthLoginUrl();
        window.location.href = url;
        return;
      }

      if (status === "connected") {
        await spotifyService.disconnect();
        setStatus("disconnected");
        setActionLoading(false);
        return;
      }

      const { url } = await spotifyService.getLoginUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Spotify button action failed", err);
      setError("Something went wrong with Spotify. Try again.");
      setActionLoading(false);
    }
  };

  const label = !user ? "Login with Spotify" : status === "connected" ? "Disconnect Spotify" : "Connect Spotify";
  const isReady = !(user && status === "checking");

  return { status, actionLoading, error, label, isReady, handleClick };
}
