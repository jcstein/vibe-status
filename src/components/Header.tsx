"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { StatusIndicator } from "./StatusIndicator";
import {
  getAggregateStatus,
  getStatusTextColor,
} from "@/lib/status-utils";
import type { StatusIndicatorValue } from "@/lib/types";

interface Props {
  lastRefresh: string | null;
  indicators: StatusIndicatorValue[];
}

export function Header({ lastRefresh, indicators }: Props) {
  const aggregate = getAggregateStatus(indicators);
  const textColor = getStatusTextColor(aggregate.indicator);

  return (
    <header className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Image
            src="/logo.svg"
            alt="vibe/status"
            width={200}
            height={40}
            priority
            className="dark:invert"
          />
          <p className="mt-1 pl-1 font-mono text-xs text-muted">
            dev essentials &mdash; live monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <div className="flex items-center gap-2">
              <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
              <span className="font-mono text-[10px] text-muted">
                {new Date(lastRefresh).toLocaleTimeString()}
              </span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Aggregate status banner */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-3">
        <StatusIndicator status={aggregate.indicator} size="lg" />
        <span className={`font-mono text-sm font-semibold ${textColor}`}>
          {aggregate.label}
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted">
          {indicators.filter((i) => i === "none").length}/{indicators.length}{" "}
          services healthy
        </span>
      </div>
    </header>
  );
}
