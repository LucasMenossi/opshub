import type { Incident } from "../api";

export const incidents: Incident[] = [
  {
    id: "1",
    title: "Payment service latency",
    severity: "critical",
    status: "investigating",
    owner: "Payments Team",
    service: "Payment Service",
    serviceId: "payment-service",
    createdAt: "2026-07-28T16:45:00Z",
    updatedAt: "2026-07-28T17:15:00Z",
  },
  {
    id: "2",
    title: "Authentication timeout",
    severity: "high",
    status: "open",
    owner: "Identity Team",
    service: "Authentication",
    serviceId: "authentication",
    createdAt: "2026-07-28T16:00:00Z",
    updatedAt: "2026-07-28T16:30:00Z",
  },
  {
    id: "3",
    title: "Notification delivery delay",
    severity: "medium",
    status: "resolved",
    owner: "Messaging Team",
    service: "Notifications",
    serviceId: "notifications",
    createdAt: "2026-07-28T14:00:00Z",
    updatedAt: "2026-07-28T15:00:00Z",
  },
];
