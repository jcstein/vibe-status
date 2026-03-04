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
      return "bg-green-500";
    case "minor":
      return "bg-yellow-500";
    case "major":
      return "bg-orange-500";
    case "critical":
      return "bg-red-500";
    case "maintenance":
      return "bg-blue-500";
    case "unknown":
      return "bg-gray-400";
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
      return "bg-green-500";
    case "degraded_performance":
      return "bg-yellow-500";
    case "partial_outage":
      return "bg-orange-500";
    case "major_outage":
      return "bg-red-500";
    case "under_maintenance":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
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
