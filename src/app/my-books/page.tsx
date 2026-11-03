import type { Metadata } from "next";
import MyBooksView from "@/components/MyBooksView";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "BookNook | My Books" };

export default function MyBooksPage() {
  return (
    <PrivateRoute>
      <MyBooksView />
    </PrivateRoute>
  );
}
