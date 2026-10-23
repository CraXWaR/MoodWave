# MoodWave

An AI-powered mood tracker that turns how you feel into music.

Log a daily mood with an optional journal note, and MoodWave reads the note to sense the emotion behind it. Streaks, a 12-week mood calendar and mood stats show your patterns over time. An AI DJ turns a free-text prompt like *"rainy Sunday, need to slow down"*, or today's logged mood, into a 10-song playlist. Each track is matched on Spotify, and the playlist is saved to your account in one click.

**Live demo:** https://mood-wave-nine.vercel.app

> **Note:** the backend runs on Render's free tier, so the first request after a period of inactivity can take up to ~50 seconds while the server wakes up.
> Spotify features only work for allowlisted accounts. The app runs in Spotify Developer Mode, which allows at most 5 test users.

---

## Features

- **Daily check-ins:** pick one of six moods (joyful, calm, sad, anxious, stressed, burnt out) and add an optional journal note.
- **AI emotion detection:** after a check-in is saved, an LLM reads the note and labels the emotion it senses. This runs in the background, so saving is never slowed down.
- **History and insights:** a check-in streak, a 12-week mood calendar, total entries, your most frequent mood over the last 30 days, and a paginated history grouped by day.
- **AI playlist generation:**
  - Describe a feeling in free text, or generate from today's average mood.
  - The AI suggests songs, MoodWave matches each one on Spotify, and you review the list before saving.
  - Remove tracks you don't want, regenerate, or edit the prompt, then save it as a private playlist on your Spotify account.
  - Prompts that aren't about a mood are politely rejected.
  - If you say *"no Metallica"*, those artists are filtered out in code, not just requested from the model.
- **Spotify accounts:** sign in with Spotify, or link Spotify to an existing email/password account. Access tokens refresh automatically.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router 7, CSS Modules |
| Backend | Node.js, Express 5, TypeScript, Zod |
| Database | PostgreSQL with Prisma 7 (`@prisma/adapter-pg`) |
| AI | Groq API (`openai/gpt-oss-20b`) |
| Integrations | Spotify Web API (OAuth Authorization Code flow) |
| Auth | JWT + bcrypt |
| Testing | Vitest, Supertest |
| Hosting | Vercel (frontend), Render (backend), Neon (PostgreSQL) |

## Engineering highlights

- **The LLM decides taste, the code enforces the rules.** Spotify's recommendation and audio-features endpoints aren't available to Developer Mode apps, so Groq suggests the songs and Spotify only matches and saves them. The model is asked for 15 candidates. The server then removes excluded artists, caps each artist at 2 songs and trims the list to 10, so the result doesn't depend on the model following instructions.
- **Robust Spotify integration:**
  - Track searches run in batches of 5 to stay clear of rate limits.
  - A song that can't be found is shown as "not found" instead of failing the whole batch.
  - Adding tracks is retried. If it still fails, the client saves into the playlist it already created instead of making a duplicate.
- **Secure OAuth:**
  - One callback serves both "log in with Spotify" and "connect Spotify", told apart by a signed, short-lived `state` JWT.
  - The app's login token is returned in the URL fragment, so it never reaches a server or the `Referer` header.
  - An existing account is never linked by email alone, which prevents account takeover through a Spotify account registered with someone else's email.
- **Layered backend:** routes, then controllers (validation and orchestration), then services (data access). Every request is validated with Zod schemas.
- **Tests:** about 90 Vitest and Supertest tests cover the Spotify OAuth flows, token refresh, playlist generation, batching and retries, and streak calculation. Prisma and `fetch` are mocked, so the suite runs without a database or network.

## Project structure

```
MoodWave/
├── client/            React + Vite frontend
│   └── src/
│       ├── components/    UI, grouped by feature (each with its own .module.css)
│       ├── context/       auth context and provider
│       ├── hooks/         data and form hooks
│       ├── pages/         routed pages
│       ├── services/      API wrappers (api.ts fetch client)
│       └── types/
└── server/            Express API
    ├── prisma/
    │   ├── schema/        Prisma schema (split per model)
    │   └── migrations/
    └── src/
        ├── routes/        → controllers/ → services/
        ├── validators/    Zod schemas
        ├── middleware/    JWT auth, error handler
        ├── seed/          mood seed + demo data
        └── utils/
```

## Getting started

### Prerequisites

- Node.js **20.19+**, which Prisma 7 requires
- PostgreSQL
- A [Groq](https://console.groq.com) API key
- A [Spotify developer app](https://developer.spotify.com/dashboard). Add your redirect URI, for example `http://127.0.0.1:3000/api/spotify/callback`, in the app settings. Spotify requires a loopback IP rather than `localhost`.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env        # then fill in the values below
npx prisma migrate dev      # create the database tables
npx prisma generate         # generate the Prisma client
npx prisma db seed          # optional: moods + a demo account with ~80 entries
npm run dev
```

`server/.env`:

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on, for example `3000` |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Long random string used to sign auth tokens |
| `AI_API_KEY` | Groq API key |
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | From your Spotify developer app |
| `SPOTIFY_REDIRECT_URI` | `http://127.0.0.1:<PORT>/api/spotify/callback`. It must match the Spotify dashboard exactly. |
| `FRONTEND_URL` | Frontend origin, for example `http://localhost:5173`, with no trailing slash. Used for CORS and OAuth redirects. |

The seed creates a demo login, **`demo@moodwave.dev` / `demo1234`**, with 84 days of history.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:3000/api
npm run dev                 # http://localhost:5173
```

`VITE_API_URL` must point at the API and include the `/api` prefix.

## Scripts

| Where | Command | What it does |
|---|---|---|
| `server/` | `npm run dev` | Start the API with hot reload |
| `server/` | `npm test` | Run the test suite (`npm run test:watch` for watch mode) |
| `server/` | `npm run build` / `npm start` | Compile to `dist/` / run the compiled server |
| `client/` | `npm run dev` | Start the Vite dev server |
| `client/` | `npm run build` | Type-check and build for production |
| `client/` | `npm run lint` | Run ESLint |

## Deployment

- **Backend (Render):** root directory `server`.
  - Build command: `npm ci --include=dev && npx prisma generate && npm run build`
  - Start command: `npx prisma migrate deploy && npm start`
  - Environment: set the variables above, using production URLs for `FRONTEND_URL` and `SPOTIFY_REDIRECT_URI`.
- **Frontend (Vercel):** root directory `client`. Set `VITE_API_URL` to the deployed API (for example `https://<your-api>.onrender.com/api`) as a non-secret variable. Vite builds it into the bundle at build time.
- **Database (Neon):** use the pooled connection string as `DATABASE_URL`.
- **Spotify dashboard:** add the production callback URL to your app's redirect URIs.

## Roadmap

- Monthly AI insight reports from mood history
- Keep chosen songs when regenerating a playlist
- Social features
- Frontend test suite

## License

[MIT](LICENSE) © 2026 Emanuil Petrov
