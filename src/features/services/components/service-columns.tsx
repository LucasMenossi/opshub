import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import type { Environment, Service, ServiceStatus } from "../data/services";
import { ServiceStatusBadge } from "@/components/badges";
import { EnvironmentLabel } from "@/components/formatters";

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
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "environment",
    header: "Environment",
    cell: ({ getValue }) => (
      <EnvironmentLabel environment={getValue<Environment>()} />
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "lastDeployment",
    header: "Last Deployment",
  },
];
