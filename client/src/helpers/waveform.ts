export const PERIOD = 1200;
export const HEIGHT = 120;
const STEP = 8;

interface WaveConfig {
  key: "front" | "mid" | "back";
  cycles: [number, number];
  phase: [number, number];
  amplitude: number;
}

export const WAVES: WaveConfig[] = [
  { key: "front", cycles: [3, 7], phase: [0, 1.2], amplitude: 34 },
  { key: "mid", cycles: [2, 5], phase: [2, 0.4], amplitude: 26 },
  { key: "back", cycles: [4, 9], phase: [4, 2.1], amplitude: 18 },
];

export function buildPath({ cycles, phase, amplitude }: WaveConfig): string {
  const points: string[] = [];
  for (let pointX = 0; pointX <= PERIOD * 2; pointX += STEP) {
    const angle = (2 * Math.PI * pointX) / PERIOD;
    const pointY =
      HEIGHT / 2 +
      amplitude * (0.65 * Math.sin(cycles[0] * angle + phase[0]) + 0.35 * Math.sin(cycles[1] * angle + phase[1]));
    points.push(`${pointX === 0 ? "M" : "L"}${pointX} ${pointY.toFixed(1)}`);
  }
  return points.join(" ");
}
