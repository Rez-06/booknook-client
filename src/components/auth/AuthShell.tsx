import Logo from "@/components/Logo";

function Illustration() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-xs" fill="none" aria-hidden="true">
      <circle cx="200" cy="205" r="165" fill="#161616" fillOpacity="0.12" />
      <rect x="70" y="262" width="260" height="46" rx="9" fill="#161616" />
      <rect x="92" y="280" width="90" height="8" rx="4" fill="#ff5a1f" />
      <rect x="85" y="214" width="235" height="44" rx="9" fill="#fff4e6" />
      <rect x="108" y="232" width="70" height="8" rx="4" fill="#161616" />
      <rect x="98" y="168" width="215" height="42" rx="9" fill="#161616" />
      <rect x="120" y="185" width="60" height="8" rx="4" fill="#ff8a4c" />
      <path d="M270 60h48v118l-24-20-24 20z" fill="#fff4e6" />
      <circle cx="88" cy="110" r="10" fill="#fff4e6" />
      <circle cx="330" cy="250" r="7" fill="#161616" />
      <circle cx="60" cy="300" r="6" fill="#fff4e6" />
    </svg>
  );
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-8">
      <div className="grid overflow-hidden rounded-[2rem] border border-base-content/10 bg-base-200 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <Logo />
          <h1 className="section-title mt-8">{title}</h1>
          <p className="mt-3 text-sm opacity-70">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-sm">{footer}</p>
        </div>
        <div className="relative hidden flex-col items-center justify-center gap-6 overflow-hidden bg-primary p-10 text-primary-content lg:flex">
          <Illustration />
          <p className="text-center font-display text-4xl uppercase leading-tight">
            Add. Borrow.
            <br />
            Return.
          </p>
          <p className="max-w-xs text-center text-sm">
            One small library, shared by everyone who loves a good book.
          </p>
        </div>
      </div>
    </div>
  );
}
