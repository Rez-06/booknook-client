"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useBorrowed } from "./BorrowedProvider";
import Modal from "./Modal";
import { api } from "@/lib/api";
import type { Book, Borrow } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";
import { errMsg, formatDate } from "@/lib/utils";

export default function BorrowButton({ book, onBorrowed }: { book: Book; onBorrowed: () => void }) {
  const { user } = useAuthUser();
  const { reload } = useBorrowed();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (book.availableCopies <= 0) {
    return (
      <button disabled className="btn btn-disabled rounded-full font-mono uppercase">
        Not Available
      </button>
    );
  }

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const borrow = await api<Borrow>("/borrows", {
        method: "POST",
        auth: true,
        body: { bookId: book._id },
      });
      toast.success(`Borrowed! Please return it by ${formatDate(borrow.returnDate)}`);
      setOpen(false);
      onBorrowed();
      await reload();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary rounded-full font-mono uppercase">
        Borrow This Book
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Confirm borrow">
        <form onSubmit={confirm} className="space-y-4">
          <p className="text-sm opacity-80">
            You are borrowing <strong>{book.title}</strong> for 7 days.
          </p>
          <input readOnly value={user?.name ?? ""} className="input w-full opacity-70" aria-label="Your name" />
          <input readOnly value={user?.email ?? ""} className="input w-full opacity-70" aria-label="Your email" />
          <button disabled={busy} className="btn btn-primary w-full rounded-full font-mono uppercase">
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Confirm Borrow"}
          </button>
        </form>
      </Modal>
    </>
  );
}
