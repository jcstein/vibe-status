"use client";

import { useState } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { ComponentList } from "./ComponentList";
import {
  getStatusLabel,
  getStatusBorderColor,
  getStatusTextColor,
  getStatusGlow,
} from "@/lib/status-utils";
import type { ServiceStatus } from "@/lib/types";

interface Props {
  service: ServiceStatus;
  index: number;
}

export function ServiceCard({ service, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = getStatusBorderColor(service.indicator);
  const textColor = getStatusTextColor(service.indicator);
  const glow = getStatusGlow(service.indicator);

  return (
    <div
      className={`card-animate border-l-4 ${borderColor} rounded-lg border border-border bg-surface transition-all duration-200 hover:bg-surface-hover ${
        service.indicator !== "none" && service.indicator !== "unknown"
          ? glow
          : ""
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4">
          <StatusIndicator status={service.indicator} />
          <div>
            <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
              {service.name}
            </h3>
            <p className={`mt-0.5 font-mono text-xs ${textColor}`}>
              {service.error
                ? "Unable to fetch status"
                : getStatusLabel(service.indicator)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] text-muted sm:inline">
            {service.components.length} components
          </span>
          <svg
            className={`h-4 w-4 text-muted transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="expand-animate border-t border-border px-5 pb-4 pt-3">
          <ComponentList components={service.components} />
          <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 font-mono text-[10px] text-muted">
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              View status page &rarr;
            </a>
            <span>
              Updated {new Date(service.updatedAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
