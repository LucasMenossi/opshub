import type { ColumnDef } from "@tanstack/react-table";

import { UserRoleBadge, UserStatusBadge } from "@/components/Badges";

import type { User, UserStatus } from "../api";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <UserRoleBadge role={getValue<User["role"]>()} />,
    filterFn: "equalsString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <UserStatusBadge status={getValue<UserStatus>()} />,
    filterFn: "equalsString",
  },
  {
    accessorKey: "team",
    header: "Team",
    filterFn: "equalsString",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<string>()}</span>
    ),
  },
];
