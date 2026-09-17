import { formatUserRole, formatUserStatus } from "@/lib/formatters";
import type { FilterOption } from "@/lib/types/filterOption";

import type { User, UserRole, UserStatus } from "../../api";
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

export function getUserFilterOptions(users: User[]): {
  role: FilterOption[];
  status: FilterOption[];
  team: FilterOption[];
} {
  return {
    role: createStaticFilterOptions(userRoles, formatUserRole),
    status: createStaticFilterOptions(userStatuses, formatUserStatus),
    team: createUniqueFilterOptions(users, (user) => user.team),
  };
}
