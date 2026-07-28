import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { DeploymentStatusBadge } from "@/components/badges";
import { formatDateTime, formatEnvironment } from "@/lib/formatters";

import type { Deployment } from "../api";

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
    cell: ({ row }) => formatEnvironment(row.original.environment),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DeploymentStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "deployedAt",
    header: "Deployed",
    cell: ({ row }) => (
      <time dateTime={row.original.deployedAt}>
        {formatDateTime(row.original.deployedAt)}
      </time>
    ),
  },
];
