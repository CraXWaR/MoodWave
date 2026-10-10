type WithToken = { token: string };

const PREFERRED_ORDER = ["joy", "calm", "sad", "anxious", "stressed", "burnout"];

const rank = (token: string) => {
  const orderIndex = PREFERRED_ORDER.indexOf(token);
  return orderIndex === -1 ? PREFERRED_ORDER.length : orderIndex;
};

export function toSpectrum(moods: WithToken[]): string[] {
  return [...moods]
    .sort((firstMood, secondMood) => rank(firstMood.token) - rank(secondMood.token))
    .map((mood) => mood.token);
}

export function loopSpectrum(tokens: string[]): string[] {
  return [...tokens, ...tokens, tokens[0]];
}

export function buildSpectrumGradient(tokens: string[]): string {
  const stops = loopSpectrum(tokens).map((token) => `var(--mood-${token})`);
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}
