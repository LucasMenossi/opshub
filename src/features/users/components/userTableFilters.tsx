import type { DataTableFilter } from "@/components/DataTable";

import { formatUserRole, formatUserStatus } from "@/lib/formatters";

import type { User, UserRole, UserStatus } from "../api";
import {
  createStaticFilterOptions,
  createUniqueFilterOptions,
} from "@/lib/table";

const userRoles: UserRole[] = [
  "administrator",
  "engineering-manager",
  "tech-lead",
  "developer",
  "viewer",
];

const userStatuses: UserStatus[] = ["active", "inactive"];

export function getUserTableFilters(users: User[]): DataTableFilter[] {
  const teams = createUniqueFilterOptions(users, (user) => user.team);

  return [
    {
      columnId: "role",
      label: "Role",
      options: createStaticFilterOptions(userRoles, formatUserRole),
    },
    {
      columnId: "status",
      label: "Status",
      options: createStaticFilterOptions(userStatuses, formatUserStatus),
    },
    {
      columnId: "team",
      label: "Team",
      options: teams,
    },
  ];
}
