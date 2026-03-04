import { getStatusColor } from "@/lib/status-utils";
import type { StatusIndicatorValue } from "@/lib/types";

interface Props {
  status: StatusIndicatorValue;
  size?: "sm" | "md";
}

export function StatusIndicator({ status, size = "md" }: Props) {
  const color = getStatusColor(status);
  const dimensions = size === "sm" ? "h-2 w-2" : "h-3 w-3";
  const pulse = status !== "none" && status !== "unknown";

  return (
    <span className="relative inline-flex">
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${color}`}
        />
      )}
      <span className={`relative inline-flex rounded-full ${dimensions} ${color}`} />
    </span>
  );
}
