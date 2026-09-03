import type { Settings } from "../api";

export const settings: Settings = {
  theme: "system",

  profile: {
    name: "Lucas Menossi",
    email: "lucas.menossi@example.com",
    team: "Platform",
    role: "Administrator",
  },

  notifications: {
    deployments: true,
    incidents: true,
    featureFlags: false,
  },

  preferences: {
    defaultLandingPage: "dashboard",
    defaultPageSize: 25,
    density: "comfortable",
    dateTimeFormat: "24h",
  },
};
