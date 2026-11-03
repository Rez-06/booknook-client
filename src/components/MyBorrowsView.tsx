"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useBorrowed } from "./BorrowedProvider";
import Spinner from "./Spinner";
import { api } from "@/lib/api";
import type { Borrow } from "@/lib/types";
import { errMsg, formatDate } from "@/lib/utils";

export default function MyBorrowsView() {
  const { reload } = useBorrowed();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    api<Borrow[]>("/borrows", { auth: true })
      .then(setBorrows)
      .catch((e) => toast.error(errMsg(e)))
      .finally(() => setLoading(false));
  }, []);

  const giveBack = async (id: string) => {
    setReturningId(id);
    try {
      await api(`/borrows/${id}`, { method: "DELETE", auth: true });
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned. Thank you!");
      await reload();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setReturningId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <p className="eyebrow mb-3">On loan to you</p>
      <h1 className="section-title">My Borrows</h1>

      {loading ? (
        <Spinner fullPage />
      ) : borrows.length === 0 ? (
        <div className="py-16 text-center">
          <p className="opacity-70">You have not borrowed any books yet.</p>
          <Link href="/books" className="btn btn-primary mt-5 rounded-full font-mono uppercase">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-base-content/10 bg-base-200">
          <table className="table">
            <thead>
              <tr className="font-mono text-xs uppercase">
                <th>Cover</th>
                <th>Title</th>
                <th>Borrow date</th>
                <th>Return date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.bookImage} alt={b.bookTitle} className="h-20 w-14 rounded-lg object-cover" />
                  </td>
                  <td>
                    <Link
                      href={`/books/${b.bookId}`}
                      className="font-display text-xl uppercase leading-tight hover:text-primary"
                    >
                      {b.bookTitle}
                    </Link>
                  </td>
                  <td className="font-mono text-sm">{formatDate(b.borrowDate)}</td>
                  <td className="font-mono text-sm">{formatDate(b.returnDate)}</td>
                  <td className="text-right">
                    <button
                      onClick={() => giveBack(b._id)}
                      disabled={returningId === b._id}
                      className="btn btn-primary btn-sm rounded-full font-mono uppercase"
                    >
                      {returningId === b._id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        "Return Book"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
