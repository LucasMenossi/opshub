import type { LucideIcon } from "lucide-react";
import {
  Flag,
  Home,
  Logs,
  Rocket,
  Server,
  Settings,
  TriangleAlert,
  Users,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: Home,
  },
  {
    label: "Services",
    to: "/services",
    icon: Server,
  },
  {
    label: "Deployments",
    to: "/deployments",
    icon: Rocket,
  },
  {
    label: "Incidents",
    to: "/incidents",
    icon: TriangleAlert,
  },
  {
    label: "Logs",
    to: "/logs",
    icon: Logs,
  },
  {
    label: "Feature Flags",
    to: "/feature-flags",
    icon: Flag,
  },
  {
    label: "Users",
    to: "/users",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];
