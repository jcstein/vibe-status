import { Dashboard } from "@/components/Dashboard";
import { services } from "@/config/services";
import { fetchAllServices } from "@/lib/fetcher";
import { sortByWorstStatus } from "@/lib/status-utils";
import type { DashboardData } from "@/lib/types";

export default async function Home() {
  const results = await fetchAllServices(services);
  const sorted = sortByWorstStatus(results);

  const data: DashboardData = {
    services: sorted,
    fetchedAt: new Date().toISOString(),
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Dashboard initialData={data} />
    </main>
  );
}
