"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { BorrowedProvider } from "./BorrowedProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="booknook-light"
      themes={["booknook-light", "booknook-dark"]}
      enableSystem={false}
    >
      <BorrowedProvider>{children}</BorrowedProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-base-200)",
            color: "var(--color-base-content)",
            border: "1px solid var(--color-base-300)",
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.85rem",
          },
        }}
      />
    </ThemeProvider>
  );
}
