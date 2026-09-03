import { z } from "zod";

import type { Theme } from "@/stores/theme.store";

export const themeSchema = z.enum(["light", "dark", "system"]);

export const densitySchema = z.enum(["comfortable", "compact"]);

export const landingPageSchema = z.enum([
  "dashboard",
  "services",
  "deployments",
  "incidents",
  "logs",
  "feature-flags",
  "users",
]);

export const dateTimeFormatSchema = z.enum(["24h", "12h"]);

export const settingsSchema = z.object({
  theme: themeSchema,

  profile: z.object({
    name: z.string().trim().min(2, "Name must contain at least 2 characters"),

    email: z.string().trim().email("Enter a valid email address"),

    team: z.string().trim().min(1, "Team is required"),

    role: z.string().trim().min(1, "Role is required"),
  }),

  notifications: z.object({
    deployments: z.boolean(),
    incidents: z.boolean(),
    featureFlags: z.boolean(),
  }),

  preferences: z.object({
    defaultLandingPage: landingPageSchema,

    defaultPageSize: z.number().int().min(10).max(100),

    density: densitySchema,

    dateTimeFormat: dateTimeFormatSchema,
  }),
});

export type Settings = z.infer<typeof settingsSchema>;

export type { Theme };
