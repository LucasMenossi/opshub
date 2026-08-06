import type { Service } from "../api";

export const services: Service[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "healthy",
    version: "v2.4.1",
    environment: "production",
    uptime: 99.99,
    owner: "Platform Team",
    lastDeployment: "2026-07-28T19:42:15.123Z",
  },
  {
    id: "authentication",
    name: "Authentication",
    status: "healthy",
    version: "v1.8.0",
    environment: "production",
    uptime: 99.95,
    owner: "Identity Team",
    lastDeployment: "2026-07-28T19:43:08.456Z",
  },
  {
    id: "payment-service",
    name: "Payment Service",
    status: "degraded",
    version: "v3.2.0",
    environment: "production",
    uptime: 98.41,
    owner: "Payments Team",
    lastDeployment: "2026-07-28T19:44:51.789Z",
  },
  {
    id: "notifications",
    name: "Notifications",
    status: "down",
    version: "v1.0.5",
    environment: "staging",
    uptime: 92.14,
    owner: "Messaging Team",
    lastDeployment: "2026-07-28T19:46:27.321Z",
  },
];
