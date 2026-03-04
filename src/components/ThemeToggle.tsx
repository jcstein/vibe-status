"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl border border-border bg-surface p-2 text-lg transition-all hover:scale-110 hover:bg-surface-hover"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span role="img" aria-label="sun">🌅</span>
      ) : (
        <span role="img" aria-label="moon">🌙</span>
      )}
    </button>
  );
}
