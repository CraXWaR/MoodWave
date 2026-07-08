const API_URL = import.meta.env.VITE_API_URL;

async function post<TResponse>(path: string, body: unknown): Promise<TResponse> {
    const res = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.error ?? 'Something went wrong. Try again.');
    }

    return data as TResponse;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthUser {
    id: string;
    email: string;
}

export const authService = {
    login: (payload: LoginPayload) => post<AuthUser>('/auth/login', payload),
    register: (payload: RegisterPayload) => post<AuthUser>('/auth/register', payload),
};