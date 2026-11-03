export default function Spinner({ fullPage = false, label = "Loading" }: { fullPage?: boolean; label?: string }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 ${fullPage ? "min-h-[60vh]" : "py-16"}`}
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <span className="font-mono text-xs uppercase tracking-widest opacity-60">{label}…</span>
    </div>
  );
}
