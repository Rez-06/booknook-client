import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="text-center">
        <p className="eyebrow mb-3">Add · Borrow · Return</p>
        <h1 className="section-title">BookNook</h1>
        <p className="mt-4 font-serif text-3xl">A small online library.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="btn btn-primary rounded-full font-mono uppercase">Browse Books</button>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
