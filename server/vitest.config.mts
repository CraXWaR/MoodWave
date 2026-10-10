import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // every vi.fn() starts each test with no calls and no stubbed behaviour
    mockReset: true,
    // modules like lib/groq.ts and utils/token.ts read these at import or call time;
    // tests never load the real .env
    env: {
      JWT_SECRET: "your_secret_here",
      AI_API_KEY: "your_api_key_here",
      SPOTIFY_CLIENT_ID: "your_spotify_client_id",
      SPOTIFY_CLIENT_SECRET: "your_spotify_client_secret",
      SPOTIFY_REDIRECT_URI: "http://localhost:3000/api/spotify/callback",
      FRONTEND_URL: "http://localhost:5173",
    },
  },
});
