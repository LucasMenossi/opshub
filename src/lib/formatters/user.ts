import type { UserRole, UserStatus } from "@/features/users/api";

export function formatUserRole(role: UserRole): string {
  switch (role) {
    case "administrator":
      return "Administrator";

    case "engineering-manager":
      return "Engineering Manager";

    case "tech-lead":
      return "Tech Lead";

    case "developer":
      return "Developer";

    case "viewer":
      return "Viewer";
  }
}

export function formatUserStatus(status: UserStatus): string {
  switch (status) {
    case "active":
      return "Active";

    case "inactive":
      return "Inactive";
  }
}
