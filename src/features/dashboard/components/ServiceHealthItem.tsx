import { Badge } from "@/components/UI";

import type { ServiceHealth } from "../data/serviceHealth";

interface ServiceHealthItemProps {
  service: ServiceHealth;
}

const statusTone = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
} as const;

const statusLabel = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
} as const;

export function ServiceHealthItem({ service }: ServiceHealthItemProps) {
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span
          className="size-2 rounded-full bg-current text-muted-foreground"
          aria-hidden
        />
        <span className="font-medium">{service.name}</span>
      </div>

      <Badge tone={statusTone[service.status]}>
        {statusLabel[service.status]}
      </Badge>
    </li>
  );
}
