import { useEffect, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { spotifyService } from "../services/spotify.service";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/auth.context";

type ConnectionStatus = "checking" | "connected" | "disconnected";

// spotify_error codes the server's OAuth callback redirects back with
const CALLBACK_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Spotify access was cancelled.",
  invalid_callback: "Spotify sent back an incomplete response. Try again.",
  invalid_state: "Your Spotify sign-in expired. Try again.",
  already_linked: "This Spotify account is already linked to another MoodWave account.",
  email_in_use:
    "An account with this email already exists. Log in with your password, then connect Spotify from your profile.",
  connection_failed: "Couldn't connect to Spotify. Try again.",
};

// Pure read (safe as a useState initializer); useCallbackParamsCleanupEffect removes the params afterwards
function readCallbackError(): string | null {
  const errorCode = new URLSearchParams(window.location.search).get("spotify_error");
  if (!errorCode) return null;
  return CALLBACK_ERROR_MESSAGES[errorCode] ?? CALLBACK_ERROR_MESSAGES.connection_failed;
}

// Strips spotify_error / spotify_connected from the URL once they've been read,
// so a refresh doesn't show the message again.
function useCallbackParamsCleanupEffect() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has("spotify_error") && !searchParams.has("spotify_connected")) return;

    searchParams.delete("spotify_error");
    searchParams.delete("spotify_connected");
    const remainingSearch = searchParams.toString();
    const cleanUrl = `${window.location.pathname}${remainingSearch ? `?${remainingSearch}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", cleanUrl);
  }, []);
}

// Handles the redirect back from Spotify after the login flow completes —
// reads the token from the URL fragment, cleans the URL, fetches the user, logs them in,
// then takes them to their profile.
function useLoginRedirectEffect(
  setAuthUser: ReturnType<typeof useAuth>["setAuthUser"],
  setError: (error: string | null) => void,
  navigate: NavigateFunction,
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
        // replace: Back shouldn't return to the landing page the token arrived on
        navigate("/profile", { replace: true });
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
  const navigate = useNavigate();
  const [status, setStatus] = useState<ConnectionStatus>(user ? "checking" : "disconnected");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(readCallbackError);

  useLoginRedirectEffect(setAuthUser, setError, navigate);
  useConnectionStatusEffect(user, setStatus);
  useCallbackParamsCleanupEffect();

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
