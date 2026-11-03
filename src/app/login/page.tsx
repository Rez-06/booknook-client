import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = { title: "BookNook | Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner fullPage />}>
      <LoginForm />
    </Suspense>
  );
}
