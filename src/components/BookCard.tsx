import Link from "next/link";
import type { Book } from "@/lib/types";
import BookCover from "./BookCover";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-content/10 bg-base-200 transition hover:-translate-y-1 hover:shadow-xl">
      <BookCover book={book} className="aspect-[3/4]" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="badge badge-primary badge-sm w-fit font-mono uppercase">{book.category}</span>
        <h3 className="line-clamp-2 min-h-[3.75rem] font-display text-2xl uppercase leading-tight">
          {book.title}
        </h3>
        <p className="text-sm opacity-70">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn btn-primary mt-auto rounded-full font-mono uppercase">
          View Details
        </Link>
      </div>
    </article>
  );
}
