"use client";

import Link from "next/link";
import { useAuthUser } from "@/lib/useAuthUser";

export default function ProfileView() {
  const { user } = useAuthUser();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-xl px-4 pb-8">
      <p className="eyebrow mb-3">Your account</p>
      <h1 className="section-title">My Profile</h1>
      <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-base-content/10 bg-base-200 p-8 text-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="size-28 rounded-full object-cover ring-4 ring-primary" />
        ) : (
          <span className="grid size-28 place-items-center rounded-full bg-primary font-display text-5xl text-primary-content">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <h2 className="font-display text-3xl uppercase">{user.name}</h2>
        <p className="font-mono text-sm opacity-70">{user.email}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/my-books" className="btn btn-primary rounded-full font-mono uppercase">
            My Books
          </Link>
          <Link href="/my-borrows" className="btn btn-outline rounded-full font-mono uppercase">
            My Borrows
          </Link>
        </div>
      </div>
    </div>
  );
}
