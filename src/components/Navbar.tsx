"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuthUser, type AuthUser } from "@/lib/useAuthUser";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function Avatar({ user, size = 40 }: { user: AuthUser; size?: number }) {
  const style = { width: size, height: size };
  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.image} alt={user.name} style={style} className="rounded-full object-cover" />
  ) : (
    <span
      style={style}
      className="grid place-items-center rounded-full bg-primary font-display text-primary-content"
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

function UserMenu({ user, logout }: { user: AuthUser; logout: () => Promise<void> }) {
  const blur = () => (document.activeElement as HTMLElement | null)?.blur();
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        aria-label="Account menu"
        className="cursor-pointer rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100"
      >
        <Avatar user={user} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-10 mt-3 w-64 rounded-2xl border border-base-content/10 bg-base-200 p-2 shadow-xl"
      >
        <li className="menu-title normal-case">
          <span className="font-display text-lg uppercase text-base-content">{user.name}</span>
          <span className="text-xs opacity-60">{user.email}</span>
        </li>
        <li>
          <Link href="/profile" onClick={blur} className="font-mono text-xs uppercase">
            <UserIcon size={16} /> My Profile
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              blur();
              void logout();
            }}
            className="font-mono text-xs uppercase text-error"
          >
            <LogOut size={16} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, isPending, logout } = useAuthUser();
  const [open, setOpen] = useState(false);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop pill + mobile top bar */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-base-content/10 bg-base-100/80 py-2 pl-4 pr-2 shadow-lg backdrop-blur-md">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
                  isActive(l.href) ? "bg-primary text-primary-content" : "hover:bg-base-content/10"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden items-center gap-2 lg:flex">
              {isPending ? (
                <div className="size-10" />
              ) : user ? (
                <UserMenu user={user} logout={logout} />
              ) : (
                <>
                  <Link href="/login" className="btn btn-ghost btn-sm rounded-full font-mono uppercase">
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-primary btn-sm rounded-full font-mono uppercase">
                    Register
                  </Link>
                </>
              )}
            </div>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="btn btn-circle btn-primary btn-sm lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] flex animate-fade-in flex-col bg-[#161616] text-[#fff4e6] lg:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <Logo />
            <button
              onClick={close}
              aria-label="Close menu"
              className="btn btn-circle btn-sm border-0 bg-[#fff4e6] text-[#161616]"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex items-center gap-3 font-display text-5xl uppercase leading-[1.15] sm:text-6xl"
              >
                {isActive(l.href) && <ChevronRight className="text-[#ff5a1f]" size={36} strokeWidth={4} />}
                <span className={isActive(l.href) ? "text-[#ff5a1f]" : ""}>{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-[#fff4e6]/15 px-6 py-6">
            {isPending ? null : user ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar user={user} size={44} />
                  <div className="min-w-0">
                    <p className="truncate font-display text-xl uppercase">{user.name}</p>
                    <p className="truncate font-mono text-xs opacity-60">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href="/profile" onClick={close} className="btn btn-outline flex-1 rounded-full border-[#fff4e6]/40 font-mono uppercase text-[#fff4e6]">
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      close();
                      void logout();
                    }}
                    className="btn btn-primary flex-1 rounded-full font-mono uppercase"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={close} className="btn btn-outline flex-1 rounded-full border-[#fff4e6]/40 font-mono uppercase text-[#fff4e6]">
                  Login
                </Link>
                <Link href="/register" onClick={close} className="btn btn-primary flex-1 rounded-full font-mono uppercase">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
