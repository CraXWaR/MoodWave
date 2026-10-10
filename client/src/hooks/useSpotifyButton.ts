import { useEffect, useState } from "react";
import { spotifyService } from "../services/spotify.service";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/auth.context";

type ConnectionStatus = "checking" | "connected" | "disconnected";

// Handles the redirect back from Spotify after the login flow completes —
// reads the token from the URL fragment, cleans the URL, fetches the user, logs them in.
function useLoginRedirectEffect(
  setAuthUser: ReturnType<typeof useAuth>["setAuthUser"],
  setError: (error: string | null) => void,
) {
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const spotifyLoginToken = hashParams.get("spotify_login_token");

    if (!spotifyLoginToken) return;

    // remove the token from the address bar right away, before the network call
    hashParams.delete("spotify_login_token");
    const remainingHash = hashParams.toString();
    const cleanUrl = `${window.location.pathname}${window.location.search}${remainingHash ? `#${remainingHash}` : ""}`;
    window.history.replaceState({}, "", cleanUrl);

    authService
      .getMe(spotifyLoginToken)
      .then((user) => {
        setAuthUser({ token: spotifyLoginToken, user });
      })
      .catch((err) => {
        console.error("Spotify login redirect failed", err);
        setError("Couldn't complete Spotify login. Try again.");
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
