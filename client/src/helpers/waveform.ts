export const PERIOD = 1200;
export const HEIGHT = 120;
const STEP = 8;

interface WaveConfig {
  key: "front" | "mid" | "back";
  cycles: [number, number];
  phase: [number, number];
  amp: number;
}

export const WAVES: WaveConfig[] = [
  { key: "front", cycles: [3, 7], phase: [0, 1.2], amp: 34 },
  { key: "mid", cycles: [2, 5], phase: [2, 0.4], amp: 26 },
  { key: "back", cycles: [4, 9], phase: [4, 2.1], amp: 18 },
];

export function buildPath({ cycles, phase, amp }: WaveConfig): string {
  const points: string[] = [];
  for (let x = 0; x <= PERIOD * 2; x += STEP) {
    const a = (2 * Math.PI * x) / PERIOD;
    const y =
      HEIGHT / 2 + amp * (0.65 * Math.sin(cycles[0] * a + phase[0]) + 0.35 * Math.sin(cycles[1] * a + phase[1]));
    points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}
