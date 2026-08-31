import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/UI";

import type { FeatureFlag } from "../../api";
import { FeatureFlagToggle } from "../FeatureFlagToggle";

export const featureFlagColumns: ColumnDef<FeatureFlag>[] = [
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
    accessorKey: "ownerId",
    header: "Owner",
  },
  {
    accessorKey: "enabled",
    header: "Status",
    cell: ({ row }) => (
      <FeatureFlagToggle id={row.original.id} enabled={row.original.enabled} />
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "rollout",
    header: "Rollout",
    cell: ({ row }) => <Badge tone="info">{row.original.rollout}%</Badge>,
  },
];
