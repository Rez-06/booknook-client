import type { Metadata } from "next";
import MyBorrowsView from "@/components/MyBorrowsView";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "BookNook | My Borrows" };

export default function MyBorrowsPage() {
  return (
    <PrivateRoute>
      <MyBorrowsView />
    </PrivateRoute>
  );
}
