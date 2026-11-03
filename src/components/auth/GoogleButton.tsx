"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const go = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
    if (error) toast.error(error.message ?? "Google sign-in failed");
  };

  return (
    <button
      type="button"
      onClick={go}
      className="btn btn-outline w-full rounded-full font-mono uppercase"
    >
      <span className="grid size-5 place-items-center rounded-full bg-base-content font-sans text-xs font-bold text-base-100">
        G
      </span>
      Continue with Google
    </button>
  );
}
