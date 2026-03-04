import {
  getComponentStatusColor,
  getComponentStatusLabel,
} from "@/lib/status-utils";
import type { ComponentStatus } from "@/lib/types";

interface Props {
  components: ComponentStatus[];
}

export function ComponentList({ components }: Props) {
  if (components.length === 0) {
    return (
      <p className="font-mono text-xs text-muted">
        No component details available.
      </p>
    );
  }

  return (
    <ul className="space-y-1.5">
      {components.map((c) => (
        <li
          key={c.id}
          className="flex items-center justify-between rounded-md bg-background/50 px-3 py-2 font-mono text-xs"
        >
          <span className="text-foreground/80">{c.name}</span>
          <span className="flex items-center gap-2">
            <span className="text-muted">
              {getComponentStatusLabel(c.status)}
            </span>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${getComponentStatusColor(
                c.status
              )}`}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
