import { api } from "./api";
import type { LoginResponse, RegisterResponse } from "../types/user.type";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  login: (payload: LoginPayload): Promise<LoginResponse> => api.post<LoginResponse>("/auth/login", payload),
  register: (payload: RegisterPayload): Promise<RegisterResponse> => api.post<RegisterResponse>("/auth/register", payload),
};
