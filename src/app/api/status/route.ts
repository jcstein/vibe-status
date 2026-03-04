import { NextResponse } from "next/server";
import { services } from "@/config/services";
import { fetchAllServices } from "@/lib/fetcher";
import { sortByWorstStatus } from "@/lib/status-utils";
import type { DashboardData } from "@/lib/types";

export const revalidate = 60;

export async function GET() {
  const results = await fetchAllServices(services);
  const sorted = sortByWorstStatus(results);

  const data: DashboardData = {
    services: sorted,
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
