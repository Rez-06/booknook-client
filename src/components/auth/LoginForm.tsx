"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthShell from "./AuthShell";
import GoogleButton from "./GoogleButton";
import { authClient } from "@/lib/auth-client";
import { errMsg } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("redirect");
  const redirect = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const { error } = await authClient.signIn.email({
        email: String(fd.get("email")),
        password: String(fd.get("password")),
      });
      if (error) {
        toast.error(error.message ?? "Invalid email or password");
        return;
      }
      toast.success("Welcome back!");
      window.location.assign(redirect);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to add, borrow and return books."
      footer={
        <>
          New here?{" "}
          <Link
            href={redirect === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirect)}`}
            className="font-bold text-primary underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="input w-full" />
        <div className="relative">
          <input
            name="password"
            type={show ? "text" : "password"}
            required
            placeholder="Password"
            className="input w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={() => toast("Password reset is coming soon", { icon: "🔒" })}
            className="font-mono text-xs uppercase underline opacity-70"
          >
            Forget password?
          </button>
        </div>

        <button disabled={busy} className="btn btn-primary w-full rounded-full font-mono uppercase">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
        <div className="divider font-mono text-xs uppercase">or</div>
        <GoogleButton callbackURL={redirect} />
      </form>
    </AuthShell>
  );
}
