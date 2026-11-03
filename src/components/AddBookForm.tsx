"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { uploadImage } from "@/lib/imgbb";
import { CATEGORIES, type Book } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";
import { errMsg } from "@/lib/utils";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-xs uppercase tracking-wider opacity-70">{label}</span>
      {children}
    </label>
  );
}

export default function AddBookForm() {
  const { user } = useAuthUser();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!file) {
      toast.error("Please choose a cover image");
      return;
    }
    setSaving(true);
    try {
      const image = await uploadImage(file);
      await api<Book>("/books", {
        method: "POST",
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
      toast.success("Book added to the shelf!");
      router.push("/my-books");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <p className="eyebrow mb-3">Share a book</p>
      <h1 className="section-title">Add Book</h1>

      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-5 rounded-3xl border border-base-content/10 bg-base-200 p-6 sm:grid-cols-2 sm:p-8"
      >
        <Field label="Book title">
          <input name="title" required className="input w-full" placeholder="e.g. Dune" />
        </Field>
        <Field label="Author name">
          <input name="author" required className="input w-full" placeholder="e.g. Frank Herbert" />
        </Field>
        <Field label="Category">
          <select name="category" required defaultValue="" className="select w-full">
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Total copies">
          <input name="totalCopies" type="number" min={1} defaultValue={1} required className="input w-full" />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Book image">
            <input type="file" accept="image/*" required onChange={onFile} className="file-input w-full" />
          </Field>
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Cover preview" className="mt-3 h-40 rounded-xl object-cover" />
          )}
        </div>

        <div className="sm:col-span-2">
          <Field label="Short description">
            <textarea
              name="description"
              required
              rows={4}
              className="textarea w-full"
              placeholder="What is this book about?"
            />
          </Field>
        </div>

        <Field label="Your name">
          <input readOnly value={user?.name ?? ""} className="input w-full opacity-70" />
        </Field>
        <Field label="Your email">
          <input readOnly value={user?.email ?? ""} className="input w-full opacity-70" />
        </Field>

        <button disabled={saving} className="btn btn-primary rounded-full font-mono uppercase sm:col-span-2">
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Add Book"}
        </button>
      </form>
    </div>
  );
}
