import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { ServiceStatusBadge } from "@/components/badges";
import { formatDateTime, formatEnvironment } from "@/lib/formatters";
import type { Environment, Service, ServiceStatus } from "@/features/services";

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Service",
    cell: ({ row }) => (
      <Link
        to="/services/$serviceId"
        params={{
          serviceId: row.original.id,
        }}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <ServiceStatusBadge status={getValue<ServiceStatus>()} />
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "environment",
    header: "Environment",
    cell: ({ getValue }) => formatEnvironment(getValue<Environment>()),
    filterFn: "equalsString",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "lastDeployment",
    header: "Last Deployment",
    cell: ({ row }) => (
      <time dateTime={row.original.lastDeployment}>
        {formatDateTime(row.original.lastDeployment)}
      </time>
    ),
  },
];
