"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BookCover from "./BookCover";
import BorrowButton from "./BorrowButton";
import Spinner from "./Spinner";
import { api } from "@/lib/api";
import type { Book } from "@/lib/types";
import { errMsg, formatDate } from "@/lib/utils";

export default function BookDetailsView() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Book>(`/books/${id}`)
      .then(setBook)
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner fullPage />;

  if (error || !book) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="section-title">Book not found</h1>
        <p className="mt-3 opacity-70">{error}</p>
        <Link href="/books" className="btn btn-primary mt-6 rounded-full font-mono uppercase">
          Back to books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8">
      <Link href="/books" className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase opacity-70 hover:opacity-100">
        <ArrowLeft size={14} /> All books
      </Link>

      <div className="grid gap-10 md:grid-cols-[320px_1fr]">
        <BookCover book={book} className="group aspect-[3/4] rounded-3xl border border-base-content/10" />

        <div>
          <span className="badge badge-primary font-mono uppercase">{book.category}</span>
          <h1 className="section-title mt-4">{book.title}</h1>
          <p className="mt-3 text-lg opacity-70">by {book.author}</p>
          <p className="mt-6 leading-relaxed">{book.description}</p>

          <dl className="mt-8 grid gap-4 rounded-3xl border border-base-content/10 bg-base-200 p-6 font-mono text-xs uppercase sm:grid-cols-2">
            <div>
              <dt className="opacity-60">Added by</dt>
              <dd className="mt-1 text-sm">{book.userName}</dd>
              <dd className="normal-case opacity-60">{book.userEmail}</dd>
            </div>
            <div>
              <dt className="opacity-60">Date added</dt>
              <dd className="mt-1 text-sm">{formatDate(book.createdAt)}</dd>
            </div>
            <div>
              <dt className="opacity-60">Copies available</dt>
              <dd className="mt-1 text-sm">
                {book.availableCopies} of {book.totalCopies}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <BorrowButton
              book={book}
              onBorrowed={() =>
                setBook((b) => (b ? { ...b, availableCopies: Math.max(b.availableCopies - 1, 0) } : b))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
