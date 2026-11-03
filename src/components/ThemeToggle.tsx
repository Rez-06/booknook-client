"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "booknook-dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark and light theme"
      onClick={() => setTheme(isDark ? "booknook-light" : "booknook-dark")}
      className="btn btn-circle btn-ghost btn-sm"
    >
      {mounted ? isDark ? <Sun size={18} /> : <Moon size={18} /> : <span className="size-[18px]" />}
    </button>
  );
}
