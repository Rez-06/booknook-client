"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { useAuthUser } from "@/lib/useAuthUser";

// Waits for the session before deciding, so a reload never kicks a logged-in user to /login.
export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, pathname, router]);

  if (isPending || !user) return <Spinner fullPage label="Checking your session" />;
  return <>{children}</>;
}
