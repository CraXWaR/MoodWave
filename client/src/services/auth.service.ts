import type { LoginResponse, RegisterResponse } from "../types/user.type";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

async function post<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error ?? "Something went wrong. Try again.");
  }

  return data as TResponse;
}

export const authService = {
  login: (payload: LoginPayload) => post<LoginResponse>("/auth/login", payload),
  register: (payload: RegisterPayload) => post<RegisterResponse>("/auth/register", payload),
};
