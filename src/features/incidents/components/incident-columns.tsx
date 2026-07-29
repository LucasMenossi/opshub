import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import {
  IncidentSeverityBadge,
  IncidentStatusBadge,
} from "@/components/badges";
import { formatDateTime } from "@/lib/formatters";

import type { Incident } from "../api";

export const incidentColumns: ColumnDef<Incident>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => (
      <IncidentSeverityBadge severity={row.original.severity} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <IncidentStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <time dateTime={row.original.createdAt}>
        {formatDateTime(row.original.createdAt)}
      </time>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <time dateTime={row.original.updatedAt}>
        {formatDateTime(row.original.updatedAt)}
      </time>
    ),
  },
];
