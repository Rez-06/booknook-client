import { BookPlus, RotateCcw, UserPlus, BookOpenCheck } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create your account", text: "Register with email or Google. It takes less than a minute and unlocks the whole shelf." },
  { icon: BookPlus, title: "Add a book", text: "Share a title you love. Set how many copies you can lend so readers know what is available." },
  { icon: BookOpenCheck, title: "Borrow a book", text: "Open any book, hit Borrow and confirm. You get seven days, and a bookmark appears on your copy." },
  { icon: RotateCcw, title: "Return it", text: "Finished early? Return it from My Borrows so the next reader can pick it up." },
];

const tips = [
  "Check the copies count on a book before you borrow.",
  "Filter All Books by category to find your next read faster.",
  "Keep your cover images clear and portrait-shaped.",
];

export default function HowItWorks() {
  return (
    <section>
      <p className="eyebrow mb-3">Get the most out of it</p>
      <h2 className="section-title">How BookNook Works</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="flex h-full flex-col rounded-3xl border border-base-content/10 bg-base-200 p-6">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-content">
                <s.icon size={22} />
              </span>
              <span className="font-display text-5xl text-base-content/20">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl uppercase">{s.title}</h3>
            <p className="mt-2 text-sm opacity-70">{s.text}</p>
          </div>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 font-mono text-xs uppercase md:grid-cols-3">
        {tips.map((t) => (
          <li key={t} className="rounded-2xl bg-neutral p-4 text-neutral-content">
            <span className="mr-2 text-primary">Tip</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
