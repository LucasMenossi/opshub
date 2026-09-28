import { Badge } from "@/components/UI";

import { formatUserRole } from "@/lib/formatters";

import type { UserRole } from "@/features/users/api";

interface UserRoleBadgeProps {
  role: UserRole;
}

const tones: Record<
  UserRole,
  "danger" | "warning" | "info" | "default" | "success"
> = {
  administrator: "danger",
  "engineering-manager": "warning",
  "tech-lead": "info",
  developer: "default",
  viewer: "success",
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return <Badge tone={tones[role]}>{formatUserRole(role)}</Badge>;
}
