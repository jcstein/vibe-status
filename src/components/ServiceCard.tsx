"use client";

import { useState } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { ComponentList } from "./ComponentList";
import { getStatusLabel } from "@/lib/status-utils";
import type { ServiceStatus } from "@/lib/types";

interface Props {
  service: ServiceStatus;
}

export function ServiceCard({ service }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={service.indicator} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {service.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {service.error
                ? "Unable to fetch status"
                : getStatusLabel(service.indicator)}
            </p>
          </div>
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
          <ComponentList components={service.components} />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 hover:underline dark:hover:text-gray-300"
            >
              View status page &rarr;
            </a>
            <span>
              Updated{" "}
              {new Date(service.updatedAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
