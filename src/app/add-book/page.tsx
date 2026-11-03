import type { Metadata } from "next";
import AddBookForm from "@/components/AddBookForm";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "BookNook | Add Book" };

export default function AddBookPage() {
  return (
    <PrivateRoute>
      <AddBookForm />
    </PrivateRoute>
  );
}
