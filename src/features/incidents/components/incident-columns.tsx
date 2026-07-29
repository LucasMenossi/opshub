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
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue<string>(columnId);
      const createdAt = new Date(value);

      const { from, to } = filterValue as {
        from?: string;
        to?: string;
      };

      if (Number.isNaN(createdAt.getTime())) {
        return false;
      }

      if (from) {
        const start = new Date(`${from}T00:00:00`);

        if (createdAt < start) {
          return false;
        }
      }

      if (to) {
        const end = new Date(`${to}T23:59:59.999`);

        if (createdAt > end) {
          return false;
        }
      }

      return true;
    },
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
