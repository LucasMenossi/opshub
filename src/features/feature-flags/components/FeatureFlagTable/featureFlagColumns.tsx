import type { ColumnDef } from "@tanstack/react-table";

import type { FeatureFlagTableRow } from "../../types";
import { FeatureFlagToggle } from "../FeatureFlagToggle";

export const featureFlagColumns: ColumnDef<FeatureFlagTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.description}</span>
    ),
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
  },
  {
    accessorKey: "enabled",
    header: "Status",
    filterFn: (row, columnId, value) =>
      value === undefined ||
      value === "" ||
      String(row.getValue<boolean>(columnId)) === value,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <FeatureFlagToggle
          id={row.original.id}
          enabled={row.original.enabled}
        />

        <span className="text-sm text-muted-foreground">
          {row.original.enabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "rollout",
    header: "Rollout",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{row.original.rollout}%</span>
    ),
  },
];
