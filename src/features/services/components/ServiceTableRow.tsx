import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui";

import type { Service } from "../data/services";

interface ServiceTableRowProps {
  service: Service;
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

const environmentLabel = {
  production: "Production",
  staging: "Staging",
} as const;

export function ServiceTableRow({ service }: ServiceTableRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-6 py-4 font-medium">
        <Link
          to="/services/$serviceId"
          params={{ serviceId: service.id }}
          className="hover:underline"
        >
          {service.name}
        </Link>
      </td>

      <td className="px-6 py-4">
        <Badge tone={statusTone[service.status]}>
          {statusLabel[service.status]}
        </Badge>
      </td>

      <td className="px-6 py-4">{service.version}</td>

      <td className="px-6 py-4">{environmentLabel[service.environment]}</td>
    </tr>
  );
}
