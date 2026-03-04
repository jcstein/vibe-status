"use client";

import { ThemeToggle } from "./ThemeToggle";

interface Props {
  lastRefresh: string | null;
}

export function Header({ lastRefresh }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Vibe Status
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Dev essentials at a glance
        </p>
      </div>
      <div className="flex items-center gap-3">
        {lastRefresh && (
          <span className="text-xs text-gray-400">
            Refreshed {new Date(lastRefresh).toLocaleTimeString()}
          </span>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
