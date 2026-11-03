export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-base-100 p-6 text-base-content">
      <div className="text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
          Add · Borrow · Return
        </p>
        <h1 className="text-6xl font-black uppercase">BookNook</h1>
        <p className="mt-3 opacity-70">A small online library.</p>
        <button className="btn btn-primary mt-6 rounded-full">Browse Books</button>
      </div>
    </main>
  );
}
