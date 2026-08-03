import type { ColumnDef } from "@tanstack/react-table";

import { UserRoleBadge, UserStatusBadge } from "@/components/badges";

import type { User, UserStatus } from "../api";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <UserRoleBadge role={getValue<User["role"]>()} />,
    filterFn: "equalsString",
  },
  {
    accessorKey: "team",
    header: "Team",
    filterFn: "equalsString",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <UserStatusBadge status={getValue<UserStatus>()} />,
    filterFn: "equalsString",
  },
];
