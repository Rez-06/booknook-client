"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Spinner from "./Spinner";
import { api } from "@/lib/api";
import { CATEGORIES, type Book } from "@/lib/types";
import { errMsg } from "@/lib/utils";

export default function BooksView() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    api<Book[]>("/books")
      .then(setBooks)
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, []);

  const shown = category === "All" ? books : books.filter((b) => b.category === category);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <p className="eyebrow mb-3">The whole shelf</p>
      <h1 className="section-title">All Books</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`btn btn-sm rounded-full font-mono uppercase ${
              category === c ? "btn-primary" : "btn-outline"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner fullPage />
      ) : error ? (
        <p className="py-16 text-center opacity-70">Could not load books: {error}</p>
      ) : shown.length === 0 ? (
        <p className="py-16 text-center opacity-70">No books in this category yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
