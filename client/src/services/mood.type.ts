export interface Mood {
  value: number;
  emoji: string;
  label: string;
  token: string;
}

//TODO: Fetch MOODS from DB
export const MOCK_MOODS: Mood[] = [
  { value: 1, emoji: "😞", label: "Stressed", token: "stressed" },
  { value: 2, emoji: "😕", label: "Sad", token: "sad" },
  { value: 3, emoji: "😐", label: "Burnt out", token: "burnout" },
  { value: 4, emoji: "🙂", label: "Calm", token: "calm" },
  { value: 5, emoji: "😄", label: "Joyful", token: "joy" },
];
