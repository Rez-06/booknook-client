"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import AuthShell from "./AuthShell";
import GoogleButton from "./GoogleButton";
import { authClient } from "@/lib/auth-client";
import { errMsg } from "@/lib/utils";

export default function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const rules = [
    { ok: /[A-Z]/.test(password), label: "One uppercase letter" },
    { ok: /[a-z]/.test(password), label: "One lowercase letter" },
    { ok: password.length >= 6, label: "At least 6 characters" },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if (rules.some((r) => !r.ok)) {
      const msg = "Password must have an uppercase letter, a lowercase letter and 6+ characters";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    setPasswordError("");
    setBusy(true);
    try {
      const photo = String(fd.get("photo") ?? "").trim();
      const { error } = await authClient.signUp.email({
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        password,
        image: photo || undefined,
      });
      if (error) {
        toast.error(error.message ?? "Registration failed");
        return;
      }
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Join BookNook"
      subtitle="Create an account to add, borrow and return books."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-primary underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" required placeholder="Full name" className="input w-full" />
        <input name="email" type="email" required placeholder="Email" className="input w-full" />
        <input name="photo" type="url" required placeholder="Photo URL" className="input w-full" />

        <div>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <ul className="mt-2 space-y-1 font-mono text-xs">
            {rules.map((r) => (
              <li key={r.label} className={`flex items-center gap-2 ${r.ok ? "text-success" : "opacity-60"}`}>
                {r.ok ? <Check size={14} /> : <X size={14} />} {r.label}
              </li>
            ))}
          </ul>
          {passwordError && <p className="mt-2 text-sm text-error">{passwordError}</p>}
        </div>

        <button disabled={busy} className="btn btn-primary w-full rounded-full font-mono uppercase">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
        <div className="divider font-mono text-xs uppercase">or</div>
        <GoogleButton callbackURL="/" />
      </form>
    </AuthShell>
  );
}
