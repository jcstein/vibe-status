import { getStatusColor } from "@/lib/status-utils";
import type { StatusIndicatorValue } from "@/lib/types";

interface Props {
  status: StatusIndicatorValue;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({ status, size = "md" }: Props) {
  const color = getStatusColor(status);
  const dimensions =
    size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-2.5 w-2.5";
  const pulse = status !== "none" && status !== "unknown";

  return (
    <span className="relative inline-flex items-center justify-center">
      {pulse && (
        <span
          className={`absolute inline-flex rounded-full opacity-40 ${color} ${
            size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5"
          } animate-ping`}
        />
      )}
      <span
        className={`relative inline-flex rounded-full ${dimensions} ${color}`}
      />
    </span>
  );
}
