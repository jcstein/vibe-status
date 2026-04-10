import type { StatuspageResponse, ServiceStatus, StatusIndicatorValue } from "./types";
import type { ServiceConfig } from "@/config/services";

// --- Statuspage / incident.io fetcher ---

async function fetchStatuspage(service: ServiceConfig): Promise<ServiceStatus> {
  const url = `${service.statusPageUrl}/api/v2/summary.json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data: StatuspageResponse = await res.json();

  // If no components have showcase=true (incident.io or all-hidden), show all non-group components
  const hasAnyShowcase = data.components.some((c) => c.showcase === true);
  const components = data.components
    .filter((c) => (!hasAnyShowcase || c.showcase) && !c.group)
    .map((c) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      description: c.description,
    }));

  return {
    key: service.key,
    name: service.name,
    url: service.statusPageUrl,
    indicator: data.status.indicator,
    description: data.status.description,
    components,
    updatedAt: data.page.updated_at,
  };
}

// --- status.io fetcher (e.g. Neon) ---

interface StatusIoResponse {
  result: {
    status_overall: {
      updated: string;
      status: string;
      status_code: number;
    };
    status: Array<{
      id: string;
      name: string;
      status: string;
      status_code: number;
    }>;
  };
}

function statusIoCodeToIndicator(code: number): StatusIndicatorValue {
  // status.io codes: 100=Operational, 300=Degraded, 400=Partial Outage,
  // 500=Major Outage, 600=Maintenance
  if (code <= 100) return "none";
  if (code <= 300) return "minor";
  if (code <= 400) return "major";
  if (code <= 500) return "critical";
  if (code <= 600) return "maintenance";
  return "unknown";
}

function statusIoCodeToComponentStatus(code: number): string {
  if (code <= 100) return "operational";
  if (code <= 300) return "degraded_performance";
  if (code <= 400) return "partial_outage";
  if (code <= 500) return "major_outage";
  if (code <= 600) return "under_maintenance";
  return "unknown";
}

async function fetchStatusIo(service: ServiceConfig): Promise<ServiceStatus> {
  const pageId = service.fetcherConfig?.pageId;
  if (!pageId) throw new Error("Missing pageId in fetcherConfig");

  const url = `${service.statusPageUrl}/1.0/status/${pageId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data: StatusIoResponse = await res.json();
  const overall = data.result.status_overall;

  const components = data.result.status.map((c) => ({
    id: c.id,
    name: c.name,
    status: statusIoCodeToComponentStatus(c.status_code),
    description: null,
  }));

  return {
    key: service.key,
    name: service.name,
    url: service.statusPageUrl,
    indicator: statusIoCodeToIndicator(overall.status_code),
    description: overall.status,
    components,
    updatedAt: overall.updated,
  };
}

// --- Google incidents fetcher (Firebase, Google Cloud, Google Workspace) ---

interface GoogleIncident {
  id: string;
  service_name: string;
  external_desc: string;
  status_impact: string;
  severity: string;
  begin: string;
  end: string | null;
  affected_products: Array<{ title: string; id: string }>;
}

function googleSeverityToIndicator(
  incidents: GoogleIncident[]
): StatusIndicatorValue {
  if (incidents.length === 0) return "none";

  let worst: StatusIndicatorValue = "minor";
  for (const inc of incidents) {
    if (inc.status_impact === "SERVICE_OUTAGE") return "critical";
    if (inc.status_impact === "SERVICE_DISRUPTION") worst = "major";
  }
  return worst;
}

async function fetchGoogleIncidents(
  service: ServiceConfig
): Promise<ServiceStatus> {
  const incidentsUrl = service.fetcherConfig?.incidentsUrl;
  if (!incidentsUrl) throw new Error("Missing incidentsUrl in fetcherConfig");

  const res = await fetch(incidentsUrl);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const allIncidents: GoogleIncident[] = await res.json();
  const productName = service.fetcherConfig?.productName;

  // Filter to active incidents (no end date)
  let activeIncidents = allIncidents.filter((i) => !i.end);

  // If productName is specified, filter to incidents affecting that product
  if (productName) {
    activeIncidents = activeIncidents.filter((i) =>
      i.affected_products.some((p) => p.title === productName)
    );
  }

  const indicator = googleSeverityToIndicator(activeIncidents);
  const description =
    activeIncidents.length === 0
      ? "All Systems Operational"
      : `${activeIncidents.length} active incident${activeIncidents.length > 1 ? "s" : ""}`;

  const components = activeIncidents.map((inc) => ({
    id: inc.id,
    name: inc.service_name,
    status:
      inc.status_impact === "SERVICE_OUTAGE"
        ? "major_outage"
        : inc.status_impact === "SERVICE_DISRUPTION"
          ? "partial_outage"
          : "degraded_performance",
    description: inc.external_desc,
  }));

  return {
    key: service.key,
    name: service.name,
    url: service.statusPageUrl,
    indicator,
    description,
    components,
    updatedAt: new Date().toISOString(),
  };
}

// --- Router ---

export async function fetchServiceStatus(
  service: ServiceConfig
): Promise<ServiceStatus> {
  const fetcherType = service.fetcherType ?? "statuspage";

  switch (fetcherType) {
    case "statusio":
      return fetchStatusIo(service);
    case "google-incidents":
      return fetchGoogleIncidents(service);
    case "statuspage":
    default:
      return fetchStatuspage(service);
  }
}

export async function fetchAllServices(
  serviceConfigs: ServiceConfig[]
): Promise<ServiceStatus[]> {
  const results = await Promise.allSettled(
    serviceConfigs.map((s) => fetchServiceStatus(s))
  );

  return results.map((result, i) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    // Return a fallback for failed fetches
    return {
      key: serviceConfigs[i].key,
      name: serviceConfigs[i].name,
      url: serviceConfigs[i].statusPageUrl,
      indicator: "unknown" as const,
      description: "Unable to fetch status",
      components: [],
      updatedAt: new Date().toISOString(),
      error: result.reason?.message || "Fetch failed",
    };
  });
}
