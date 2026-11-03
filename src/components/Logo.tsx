import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="BookNook home">
      <span
        className={`grid size-9 place-items-center rounded-xl ${
          invert ? "bg-[#161616] text-[#ff5a1f]" : "bg-primary text-primary-content"
        }`}
      >
        <BookOpen size={20} strokeWidth={2.5} />
      </span>
      <span className="font-display text-2xl uppercase leading-none tracking-wide">BookNook</span>
    </Link>
  );
}
