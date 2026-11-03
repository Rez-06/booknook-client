import type { Book } from "@/lib/types";

export default function BookCover({
  book,
  className = "",
}: {
  book: Pick<Book, "_id" | "image" | "title">;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-base-300 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
