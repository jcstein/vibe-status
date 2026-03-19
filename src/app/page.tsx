import { Dashboard } from "@/components/Dashboard";
import { DEFAULT_SERVICE_KEYS, getServicesByKeys } from "@/config/services";
import { fetchAllServices } from "@/lib/fetcher";
import { sortByWorstStatus } from "@/lib/status-utils";
import { auth } from "@/lib/auth";
import { getUserServiceKeys, getUserSortPreference } from "@/lib/user-services";
import type { DashboardData } from "@/lib/types";

export default async function Home() {
  const session = await auth();

  let serviceKeys = DEFAULT_SERVICE_KEYS;
  let sortPreference: "custom" | "severity" = "severity";

  if (session?.user?.id) {
    serviceKeys = await getUserServiceKeys(session.user.id);
    sortPreference = await getUserSortPreference(session.user.id);
  }

  const configs = getServicesByKeys(serviceKeys);
  const results = await fetchAllServices(configs);
  const services =
    sortPreference === "severity" ? sortByWorstStatus(results) : results;

  const data: DashboardData = {
    services,
    fetchedAt: new Date().toISOString(),
  };

  const user = session?.user
    ? { name: session.user.name ?? undefined, image: session.user.image ?? undefined }
    : undefined;

  return (
    <Dashboard
      initialData={data}
      serviceKeys={serviceKeys}
      user={user}
      initialSortPreference={sortPreference}
    />
  );
}
