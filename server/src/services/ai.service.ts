import { groq } from "../lib/groq.js";

const VALID_TOKENS = ["stressed", "sad", "burnout", "calm", "joy"] as const;
type MoodToken = (typeof VALID_TOKENS)[number];

const SYSTEM_PROMPT = `You are an emotion classifier for a mood-tracking app.
Given a short journal note, respond with exactly one of these tokens: stressed, sad, burnout, calm, joy.
If the note is empty, unclear, or doesn't express an emotion, respond with: none.
Respond with the token only. No punctuation, no explanation, no extra words.`;

export class AiService {
  private model = "llama-3.3-70b-versatile";

  async detectEmotion(note: string | null): Promise<MoodToken | null> {
    if (!note || note.trim().length === 0) return null;

    try {
      const completion = await groq.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: note },
        ],
        temperature: 0,
        max_tokens: 10,
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
    return (VALID_TOKENS as readonly string[]).includes(value);
  }
}
