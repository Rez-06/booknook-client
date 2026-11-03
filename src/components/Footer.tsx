import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";

const columns = [
  {
    title: "Browse",
    links: [
      { href: "/", label: "Home" },
      { href: "/books", label: "All Books" },
    ],
  },
  {
    title: "Your Shelf",
    links: [
      { href: "/add-book", label: "Add Book" },
      { href: "/my-books", label: "My Books" },
      { href: "/my-borrows", label: "My Borrows" },
    ],
  },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socialClass =
  "grid size-9 place-items-center rounded-full border border-primary-content/40 transition hover:bg-primary-content hover:text-primary";

export default function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-primary text-primary-content">
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-6 font-serif text-4xl leading-tight">Stay in the know</p>
            <p className="mt-3 max-w-xs text-sm">
              BookNook is a small community library: add a book, borrow a book, return a book.
            </p>
            <div className="mt-5 flex gap-2">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="BookNook on X" className={socialClass}>
                <XIcon />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="BookNook on GitHub" className={socialClass}>
                <GithubIcon />
              </a>
              <a href="mailto:hello@booknook.dev" aria-label="Email BookNook" className={socialClass}>
                <Mail size={16} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest">{col.title}</h3>
              <ul className="space-y-2 font-mono text-xs uppercase">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest">Contact</h3>
            <ul className="space-y-2 font-mono text-xs uppercase">
              <li>hello@booknook.dev</li>
              <li>+880 1700-000000</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-primary-content/25 pt-6 font-mono text-xs uppercase">
          <span>© {new Date().getFullYear()} BookNook. All rights reserved.</span>
          <span>Add a book · Borrow a book · Return a book</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="-mb-[3vw] select-none whitespace-nowrap pt-6 text-center font-display text-[26vw] uppercase leading-[0.9]"
      >
        BookNook
      </div>
    </footer>
  );
}
