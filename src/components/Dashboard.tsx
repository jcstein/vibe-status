"use client";

import { useState, useCallback } from "react";
import { ServiceCard } from "./ServiceCard";
import { Header } from "./Header";
import { usePolling } from "@/hooks/usePolling";
import { sortByWorstStatus } from "@/lib/status-utils";
import type { DashboardData, ServiceStatus } from "@/lib/types";

interface Props {
  initialData: DashboardData;
}

export function Dashboard({ initialData }: Props) {
  const [services, setServices] = useState<ServiceStatus[]>(initialData.services);
  const [fetchedAt, setFetchedAt] = useState<string>(initialData.fetchedAt);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/status");
      if (!res.ok) return;
      const data: DashboardData = await res.json();
      setServices(sortByWorstStatus(data.services));
      setFetchedAt(data.fetchedAt);
    } catch {
      // Silently ignore — will retry next interval
    }
  }, []);

  usePolling(refresh, 60_000);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Header lastRefresh={fetchedAt} />
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.key} service={service} />
        ))}
      </div>
    </div>
  );
}
