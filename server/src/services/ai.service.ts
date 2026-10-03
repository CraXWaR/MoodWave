import { groq } from "../lib/groq.js";
import { SongSuggestion } from "../types/spotify.interface.js";
import { VALID_MOOD_TOKENS } from "../utils/constants.js";
import { ErrorService } from "../utils/service-error.js";

type MoodToken = (typeof VALID_MOOD_TOKENS)[number];

const MOOD_SYSTEM_PROMPT = `You are an emotion classifier for a mood-tracking app.
Given a short journal note, respond with exactly one of these tokens: stressed, sad, burnout, calm, joy, anxious.
If the note is empty, unclear, or doesn't express an emotion, respond with: none.
Respond with the token only. No punctuation, no explanation, no extra words.`;

const SONG_SYSTEM_PROMPT = `You are a music recommendation assistant for a mood-tracking app.
Given a prompt describing a mood or feeling, respond with exactly 10 real songs that fit.
Respond ONLY with valid JSON in this exact shape:
{ "songs": [ { "title": "...", "artist": "..." }, ... ] }

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
        max_tokens: 500,
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
      .slice(0, 10);

    if (songs.length === 0) {
      throw new ErrorService("Failed to generate songs, please try again", 502);
    }

    return { rejected: false, songs };
  }
}
