import type { DataTableFilter } from "@/components/data-table";

import { formatUserRole, formatUserStatus } from "@/lib/formatters";

import type { User, UserRole, UserStatus } from "../api";

const userRoles: UserRole[] = [
  "administrator",
  "engineering-manager",
  "tech-lead",
  "developer",
  "viewer",
];

const userStatuses: UserStatus[] = ["active", "inactive"];

export function getUserTableFilters(users: User[]): DataTableFilter[] {
  const teams = [...new Set(users.map((user) => user.team))]
    .sort()
    .map((team) => ({
      value: team,
      label: team,
    }));

  return [
    {
      columnId: "role",
      label: "Roles",
      options: userRoles.map((role) => ({
        value: role,
        label: formatUserRole(role),
      })),
    },
    {
      columnId: "status",
      label: "Statuses",
      options: userStatuses.map((status) => ({
        value: status,
        label: formatUserStatus(status),
      })),
    },
    {
      columnId: "team",
      label: "Teams",
      options: teams,
    },
  ];
}
