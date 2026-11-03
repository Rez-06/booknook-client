"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { api } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";
import { errMsg } from "@/lib/utils";

export default function EditBookModal({
  book,
  onClose,
  onSaved,
}: {
  book: Book | null;
  onClose: () => void;
  onSaved: (b: Book) => void;
}) {
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;
    const fd = new FormData(e.currentTarget);
    const file = fd.get("image");
    setSaving(true);
    try {
      const image = file instanceof File && file.size > 0 ? await uploadImage(file) : book.image;
      const updated = await api<Book>(`/books/${book._id}`, {
        method: "PATCH",
        auth: true,
        body: {
          title: fd.get("title"),
          author: fd.get("author"),
          category: fd.get("category"),
          totalCopies: Number(fd.get("totalCopies")),
          description: fd.get("description"),
          image,
        },
      });
      toast.success("Book updated");
      onSaved(updated);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={!!book} onClose={onClose} title="Edit Book">
      {book && (
        <form onSubmit={onSubmit} className="space-y-4" key={book._id}>
          <input name="title" required defaultValue={book.title} className="input w-full" />
          <input name="author" required defaultValue={book.author} className="input w-full" />
          <div className="grid grid-cols-2 gap-4">
            <select name="category" defaultValue={book.category} className="select w-full">
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              name="totalCopies"
              type="number"
              min={1}
              required
              defaultValue={book.totalCopies}
              className="input w-full"
            />
          </div>
          <div>
            <span className="font-mono text-xs uppercase opacity-60">New cover (optional)</span>
            <input name="image" type="file" accept="image/*" className="file-input mt-1 w-full" />
          </div>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={book.description}
            className="textarea w-full"
          />
          <button disabled={saving} className="btn btn-primary w-full rounded-full font-mono uppercase">
            {saving ? <span className="loading loading-spinner loading-sm" /> : "Save changes"}
          </button>
        </form>
      )}
    </Modal>
  );
}
