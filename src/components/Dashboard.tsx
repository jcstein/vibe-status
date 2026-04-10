"use client";

import { useState, useCallback } from "react";
import { ServiceCard } from "./ServiceCard";
import { Header } from "./Header";
import { getServicesByKeys } from "@/config/services";
import { fetchAllServices } from "@/lib/fetcher";
import { usePolling } from "@/hooks/usePolling";
import { sortByWorstStatus } from "@/lib/status-utils";
import type { DashboardData } from "@/lib/types";

interface Props {
  initialData: DashboardData;
  serviceKeys?: string[];
}

export function Dashboard({ initialData, serviceKeys }: Props) {
  const [services, setServices] = useState(initialData.services);
  const [fetchedAt, setFetchedAt] = useState<string>(initialData.fetchedAt);

  const refresh = useCallback(async () => {
    try {
      const keys = serviceKeys ?? [];
      const configs = getServicesByKeys(keys);
      const results = await fetchAllServices(configs);
      setServices(sortByWorstStatus(results));
      setFetchedAt(new Date().toISOString());
    } catch {
      // Silently ignore — will retry next interval
    }
  }, [serviceKeys]);

  usePolling(refresh, 60_000);

  const indicators = services.map((s) => s.indicator);

  return (
    <div className="ocean-bg min-h-screen">
      <div className="mx-auto max-w-2xl space-y-4 px-5 py-8 sm:py-12">
        <Header lastRefresh={fetchedAt} indicators={indicators} />

        <div className="space-y-3">
          {services.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} />
          ))}
        </div>

        <footer className="pt-6 text-center text-xs text-muted space-y-1">
          <p>polling every 60s &middot; powered by statuspage api</p>
          <p>
            Built with ❤️. If you have feedback, please{" "}
            <a
              href="https://github.com/dmsakamoto/vibe-status/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-foreground"
            >
              share
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
