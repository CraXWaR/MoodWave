import { groq } from "../lib/groq.js";
import { SongSuggestion } from "../types/spotify.interface.js";
import { VALID_MOOD_TOKENS } from "../utils/constants.js";
import { ErrorService } from "../utils/service-error.js";

type MoodToken = (typeof VALID_MOOD_TOKENS)[number];

const MOOD_SYSTEM_PROMPT = `You are an emotion classifier for a mood-tracking app.
Given a short journal note, respond with exactly one of these tokens: stressed, sad, burnout, calm, joy, anxious.
If the note is empty, unclear, or doesn't express an emotion, respond with: none.
Respond with the token only. No punctuation, no explanation, no extra words.`;

// More than the 10 a playlist gets, so the controller can drop excluded or repeated artists and still fill it
const SUGGESTION_COUNT = 15;

const SONG_SYSTEM_PROMPT = `You are a music recommendation assistant for a mood-tracking app.
Given a prompt describing a mood or feeling, suggest exactly ${SUGGESTION_COUNT} real, existing songs that fit it.

Rules:
- If the user says they don't want certain artists or songs, never include them, and list every artist they want to avoid in "avoidArtists".
- Use at most 2 songs per artist.
- Mix well-known and lesser-known tracks. Don't default to the single most famous song of a genre.
- Spell artist names the way they appear on streaming services.

Respond ONLY with valid JSON in this exact shape:
{ "songs": [ { "title": "...", "artist": "..." }, ... ], "avoidArtists": [ "..." ] }
Use an empty array for "avoidArtists" when the user didn't exclude anyone.

If the prompt is not about a mood, feeling, or does not give enough to base a music suggestion on, respond ONLY with:
{ "rejected": true, "message": "I can't find any songs for that — try describing a mood or feeling." }

No extra text, no markdown, no explanation outside the JSON.`;

interface RejectedSongSuggestion {
  rejected: true;
  message: string;
}
interface AcceptedSongSuggestion {
  rejected: false;
  songs: SongSuggestion[];
  avoidArtists: string[];
}

type GenerateSongsResult = AcceptedSongSuggestion | RejectedSongSuggestion;

export class AiService {
  private model = "openai/gpt-oss-20b";

  async detectEmotion(note: string | null): Promise<MoodToken | null> {
    if (!note || note.trim().length === 0) return null;

    try {
      const completion = await groq.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: MOOD_SYSTEM_PROMPT },
          { role: "user", content: note },
        ],
        temperature: 0,
        max_tokens: 50,
        reasoning_effort: "low",
      });

      const raw = completion.choices[0]?.message?.content?.trim().toLowerCase();
      if (!raw || !this.isValidToken(raw)) return null;

      return raw;
    } catch (error) {
      console.error("GroqService.detectEmotion failed:", error);
      return null;
    }
  }

  private isValidToken(value: string): value is MoodToken {
    return (VALID_MOOD_TOKENS as readonly string[]).includes(value);
  }

  async generateSongSuggestions(prompt: string): Promise<GenerateSongsResult> {
    if (!prompt || prompt.trim().length === 0) {
      throw new ErrorService("Prompt is required", 400);
    }

    let raw: string | undefined;

    try {
      const completion = await groq.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: SONG_SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        // includes the model's hidden reasoning tokens, so leave room for 15 songs of JSON after it
        max_tokens: 1200,
        reasoning_effort: "low",
        response_format: { type: "json_object" },
      });

      raw = completion.choices[0]?.message?.content?.trim();
    } catch (error) {
      console.error("AiService.generateSongSuggestions Groq call failed:", error);
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    if (!raw) {
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error("AiService.generateSongSuggestions JSON parse failed:", raw);
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    if (parsed.rejected === true) {
      return { rejected: true, message: parsed.message ?? "I can't find any songs for that." };
    }

    if (!Array.isArray(parsed.songs)) {
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    const songs: SongSuggestion[] = parsed.songs
      .filter((song: any) => typeof song?.title === "string" && typeof song?.artist === "string")
      .slice(0, SUGGESTION_COUNT);

    if (songs.length === 0) {
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    const avoidArtists: string[] = Array.isArray(parsed.avoidArtists)
      ? parsed.avoidArtists.filter((artist: unknown) => typeof artist === "string" && artist.trim().length > 0)
      : [];

    return { rejected: false, songs, avoidArtists };
  }
}
