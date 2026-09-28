import { Badge } from "@/components/UI";

import { formatUserStatus } from "@/lib/formatters";

import type { UserStatus } from "@/features/users/api";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const tones: Record<UserStatus, "success" | "default"> = {
  active: "success",
  inactive: "default",
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return <Badge tone={tones[status]}>{formatUserStatus(status)}</Badge>;
}
