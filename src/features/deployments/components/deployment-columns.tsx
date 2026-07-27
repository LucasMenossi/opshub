import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { DeploymentStatusBadge } from "@/components/badges";

import type {
  Deployment,
  DeploymentEnvironment,
  DeploymentStatus,
} from "../api";
import { formatDateTime, formatEnvironment } from "@/lib/formatters";

export const deploymentColumns: ColumnDef<Deployment>[] = [
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => (
      <Link
        to="/services/$serviceId"
        params={{ serviceId: row.original.serviceId }}
        className="font-medium hover:underline"
      >
        {row.original.service}
      </Link>
    ),
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "environment",
    header: "Environment",
    cell: ({ getValue }) =>
      formatEnvironment(getValue<DeploymentEnvironment>()),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <DeploymentStatusBadge status={getValue<DeploymentStatus>()} />
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "deployedAt",
    header: "Deployed",
    cell: ({ getValue }) => (
      <time dateTime={getValue<string>()}>
        {formatDateTime(getValue<string>())}
      </time>
    ),
  },
];
