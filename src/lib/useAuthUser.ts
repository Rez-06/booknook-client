"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./auth-client";

export type AuthUser = { name: string; email: string; image?: string | null };

export function useAuthUser() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  };

  const user: AuthUser | null = data?.user
    ? { name: data.user.name, email: data.user.email, image: data.user.image }
    : null;

  return { user, isPending, logout };
}
