"use client";

import { BookmarkCheck } from "lucide-react";
import { useBorrowed } from "./BorrowedProvider";
import type { Book } from "@/lib/types";

export default function BookCover({
  book,
  className = "",
}: {
  book: Pick<Book, "_id" | "image" | "title">;
  className?: string;
}) {
  const { ids } = useBorrowed();
  const borrowed = ids.has(book._id);

  return (
    <div className={`relative overflow-hidden bg-base-300 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      {borrowed && (
        <div className="absolute right-4 top-0 z-10 drop-shadow-lg" title="You borrowed this book">
          <div
            className="flex h-14 w-9 items-start justify-center bg-primary pt-2 text-primary-content"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
          >
            <BookmarkCheck size={16} />
          </div>
          <span className="sr-only">Borrowed by you</span>
        </div>
      )}
    </div>
  );
}
