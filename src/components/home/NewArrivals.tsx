"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { api } from "@/lib/api";
import type { Book } from "@/lib/types";
import { errMsg } from "@/lib/utils";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Book[]>("/books?limit=6")
      .then(setBooks)
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <p className="eyebrow mb-3">Fresh on the shelf</p>
      <h2 className="section-title">New Arrivals</h2>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="py-12 text-center opacity-70">Could not load books: {error}</p>
      ) : books.length === 0 ? (
        <p className="py-12 text-center opacity-70">No books yet. Be the first to add one!</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b, i) => (
            <BookCard key={b._id} book={b} index={i} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/books" className="btn btn-primary rounded-full font-mono uppercase">
          See All Books
        </Link>
      </div>
    </section>
  );
}
