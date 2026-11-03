import type { Metadata } from "next";
import BooksView from "@/components/BooksView";

export const metadata: Metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return <BooksView />;
}
