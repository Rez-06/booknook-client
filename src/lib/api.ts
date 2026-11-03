import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function api<T>(
  path: string,
  { method = "GET", body, auth = false }: Options = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Your session expired. Please log in again.");
    headers.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json as T;
}
