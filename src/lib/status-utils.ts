import type { StatusIndicatorValue } from "./types";

const severityOrder: Record<StatusIndicatorValue, number> = {
  critical: 0,
  major: 1,
  minor: 2,
  maintenance: 3,
  unknown: 4,
  none: 5,
};

export function sortByWorstStatus<T extends { indicator: StatusIndicatorValue }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => severityOrder[a.indicator] - severityOrder[b.indicator]
  );
}

export function getStatusColor(indicator: StatusIndicatorValue): string {
  switch (indicator) {
    case "none":
      return "bg-accent-green";
    case "minor":
      return "bg-accent-yellow";
    case "major":
      return "bg-accent-orange";
    case "critical":
      return "bg-accent-red";
    case "maintenance":
      return "bg-accent-blue";
    case "unknown":
      return "bg-accent-gray";
  }
}

export function getStatusGlow(indicator: StatusIndicatorValue): string {
  switch (indicator) {
    case "none":
      return "status-glow-green";
    case "minor":
      return "status-glow-yellow";
    case "major":
      return "status-glow-orange";
    case "critical":
      return "status-glow-red";
    case "maintenance":
      return "status-glow-blue";
    case "unknown":
      return "";
  }
}

export function getStatusBorderColor(indicator: StatusIndicatorValue): string {
  switch (indicator) {
    case "none":
      return "border-l-accent-green";
    case "minor":
      return "border-l-accent-yellow";
    case "major":
      return "border-l-accent-orange";
    case "critical":
      return "border-l-accent-red";
    case "maintenance":
      return "border-l-accent-blue";
    case "unknown":
      return "border-l-accent-gray";
  }
}

export function getStatusTextColor(indicator: StatusIndicatorValue): string {
  switch (indicator) {
    case "none":
      return "text-accent-green";
    case "minor":
      return "text-accent-yellow";
    case "major":
      return "text-accent-orange";
    case "critical":
      return "text-accent-red";
    case "maintenance":
      return "text-accent-blue";
    case "unknown":
      return "text-accent-gray";
  }
}

export function getStatusLabel(indicator: StatusIndicatorValue): string {
  switch (indicator) {
    case "none":
      return "Operational";
    case "minor":
      return "Minor Issue";
    case "major":
      return "Major Issue";
    case "critical":
      return "Critical";
    case "maintenance":
      return "Maintenance";
    case "unknown":
      return "Unknown";
  }
}

export function getComponentStatusColor(status: string): string {
  switch (status) {
    case "operational":
      return "bg-accent-green";
    case "degraded_performance":
      return "bg-accent-yellow";
    case "partial_outage":
      return "bg-accent-orange";
    case "major_outage":
      return "bg-accent-red";
    case "under_maintenance":
      return "bg-accent-blue";
    default:
      return "bg-accent-gray";
  }
}

export function getComponentStatusLabel(status: string): string {
  switch (status) {
    case "operational":
      return "Operational";
    case "degraded_performance":
      return "Degraded";
    case "partial_outage":
      return "Partial Outage";
    case "major_outage":
      return "Major Outage";
    case "under_maintenance":
      return "Maintenance";
    default:
      return "Unknown";
  }
}

export function getAggregateStatus(
  indicators: StatusIndicatorValue[]
): { label: string; indicator: StatusIndicatorValue } {
  if (indicators.some((i) => i === "critical"))
    return { label: "Critical Issues Detected", indicator: "critical" };
  if (indicators.some((i) => i === "major"))
    return { label: "Major Issues Detected", indicator: "major" };
  if (indicators.some((i) => i === "minor"))
    return { label: "Minor Issues Detected", indicator: "minor" };
  if (indicators.some((i) => i === "maintenance"))
    return { label: "Maintenance In Progress", indicator: "maintenance" };
  if (indicators.some((i) => i === "unknown"))
    return { label: "Some Services Unreachable", indicator: "unknown" };
  return { label: "All Systems Operational", indicator: "none" };
}
