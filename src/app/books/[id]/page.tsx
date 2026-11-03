import type { Metadata } from "next";
import BookDetailsView from "@/components/BookDetailsView";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "BookNook | Book Details" };

export default function BookDetailsPage() {
  return (
    <PrivateRoute>
      <BookDetailsView />
    </PrivateRoute>
  );
}
