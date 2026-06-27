const API_URL = "http://localhost:3000/api";

export async function getHealth() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}