type WithToken = { token: string };

const PREFERRED_ORDER = ["joy", "calm", "sad", "anxious", "stressed", "burnout"];

const rank = (token: string) => {
  const i = PREFERRED_ORDER.indexOf(token);
  return i === -1 ? PREFERRED_ORDER.length : i;
};

export function toSpectrum(moods: WithToken[]): string[] {
  return [...moods].sort((a, b) => rank(a.token) - rank(b.token)).map((m) => m.token);
}

export function loopSpectrum(tokens: string[]): string[] {
  return [...tokens, ...tokens, tokens[0]];
}

export function buildSpectrumGradient(tokens: string[]): string {
  const stops = loopSpectrum(tokens).map((t) => `var(--mood-${t})`);
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}
