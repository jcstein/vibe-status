// Raw Statuspage API response types
export interface StatuspageResponse {
  page: {
    id: string;
    name: string;
    url: string;
    updated_at: string;
  };
  status: {
    indicator: "none" | "minor" | "major" | "critical" | "maintenance";
    description: string;
  };
  components: StatuspageComponent[];
}

export interface StatuspageComponent {
  id: string;
  name: string;
  status:
    | "operational"
    | "degraded_performance"
    | "partial_outage"
    | "major_outage"
    | "under_maintenance";
  description: string | null;
  showcase: boolean;
  group: boolean;
  group_id: string | null;
}

// Normalized types used by our dashboard
export interface ServiceStatus {
  key: string;
  name: string;
  url: string;
  indicator: StatusIndicatorValue;
  description: string;
  components: ComponentStatus[];
  updatedAt: string;
  error?: string;
}

export interface ComponentStatus {
  id: string;
  name: string;
  status: string;
  description: string | null;
}

export type StatusIndicatorValue =
  | "none"
  | "minor"
  | "major"
  | "critical"
  | "maintenance"
  | "unknown";

export interface DashboardData {
  services: ServiceStatus[];
  fetchedAt: string;
}
