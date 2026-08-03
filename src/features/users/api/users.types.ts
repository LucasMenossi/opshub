export type UserRole =
  | "administrator"
  | "engineering-manager"
  | "tech-lead"
  | "developer"
  | "viewer";

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: string;
  status: UserStatus;
}
