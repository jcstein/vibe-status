import { Dashboard } from "@/components/Dashboard";
import { DEFAULT_SERVICE_KEYS, getServicesByKeys } from "@/config/services";
import { fetchAllServices } from "@/lib/fetcher";
import { sortByWorstStatus } from "@/lib/status-utils";
import type { DashboardData } from "@/lib/types";

export default async function Home() {
  const serviceKeys = DEFAULT_SERVICE_KEYS;
  const configs = getServicesByKeys(serviceKeys);
  const results = await fetchAllServices(configs);
  const services = sortByWorstStatus(results);

  const data: DashboardData = {
    services,
    fetchedAt: new Date().toISOString(),
  };

  return (
    <Dashboard
      initialData={data}
      serviceKeys={serviceKeys}
    />
  );
}
