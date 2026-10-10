const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  body?: unknown;
};

// Keeps the status and the parsed error body so callers can read extra fields the server sent
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request<TResponse>(
  method: string,
  path: string,
  { body, headers, ...rest }: RequestOptions = {},
): Promise<TResponse> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";

    throw new Error("Session expired. Please sign in again.");
  }

  if (!res.ok) {
    throw new ApiError(data?.error ?? "Something went wrong. Try again.", res.status, data);
  }

  return data as TResponse;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, options),
};