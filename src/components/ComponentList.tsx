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
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No component details available.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {components.map((c) => (
        <li key={c.id} className="flex items-center justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">{c.name}</span>
          <span className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">
              {getComponentStatusLabel(c.status)}
            </span>
            <span
              className={`inline-block h-2 w-2 rounded-full ${getComponentStatusColor(
                c.status
              )}`}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
