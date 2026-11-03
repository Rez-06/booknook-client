"use client";

export type AuthUser = { name: string; email: string; image?: string | null };

// Temporary stub. Replaced by the real Better Auth hook in push 14.
export function useAuthUser(): {
  user: AuthUser | null;
  isPending: boolean;
  logout: () => Promise<void>;
} {
  return { user: null, isPending: false, logout: async () => {} };
}
