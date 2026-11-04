"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import EditBookModal from "./EditBookModal";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { api } from "@/lib/api";
import type { Book } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";
import { errMsg } from "@/lib/utils";

export default function MyBooksView() {
  const { user } = useAuthUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Book[]>("/books")
      .then(setBooks)
      .catch((e) => toast.error(errMsg(e)))
      .finally(() => setLoading(false));
  }, []);

  const mine = useMemo(() => books.filter((b) => b.userEmail === user?.email), [books, user?.email]);

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success("Book deleted");
      setDeleting(null);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <p className="eyebrow mb-3">Books you shared</p>
      <h1 className="section-title">My Books</h1>

      {loading ? (
        <Spinner fullPage />
      ) : mine.length === 0 ? (
        <div className="py-16 text-center">
          <p className="opacity-70">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-5 rounded-full font-mono uppercase">
            Add your first book
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-base-content/10 bg-base-200">
          <table className="table">
            <thead>
              <tr className="font-mono text-xs uppercase">
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Copies</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((b) => (
                <tr key={b._id}>
                  <td>
                    
                    <img src={b.image} alt={b.title} className="h-20 w-14 rounded-lg object-cover" />
                  </td>
                  <td>
                    <p className="font-display text-xl uppercase leading-tight">{b.title}</p>
                    <p className="text-sm opacity-60">{b.author}</p>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-sm font-mono uppercase">{b.category}</span>
                  </td>
                  <td className="font-mono text-sm">
                    {b.availableCopies}/{b.totalCopies}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(b)}
                        className="btn btn-outline btn-sm rounded-full font-mono uppercase"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleting(b)}
                        className="btn btn-sm btn-error btn-outline rounded-full font-mono uppercase"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditBookModal
        book={editing}
        onClose={() => setEditing(null)}
        onSaved={(updated) => {
          setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
          setEditing(null);
        }}
      />

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete this book?">
        <p className="opacity-80">
          &ldquo;{deleting?.title}&rdquo; will be removed from the library for everyone. This cannot be
          undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setDeleting(null)} className="btn btn-outline flex-1 rounded-full font-mono uppercase">
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={busy}
            className="btn btn-error flex-1 rounded-full font-mono uppercase"
          >
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Yes, delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
