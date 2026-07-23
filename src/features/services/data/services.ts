export type ServiceStatus = "healthy" | "degraded" | "down";
export type Environment = "production" | "staging";

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  version: string;
  environment: Environment;
  uptime: number;
  owner: string;
  lastDeployment: string;
}

export const services: Service[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "healthy",
    version: "v2.4.1",
    environment: "production",
    uptime: 99.99,
    owner: "Platform Team",
    lastDeployment: "5 minutes ago",
  },
  {
    id: "authentication",
    name: "Authentication",
    status: "healthy",
    version: "v1.8.0",
    environment: "production",
    uptime: 99.95,
    owner: "Identity Team",
    lastDeployment: "20 minutes ago",
  },
  {
    id: "payment-service",
    name: "Payment Service",
    status: "degraded",
    version: "v3.2.0",
    environment: "production",
    uptime: 98.41,
    owner: "Payments Team",
    lastDeployment: "2 hours ago",
  },
  {
    id: "notifications",
    name: "Notifications",
    status: "down",
    version: "v1.0.5",
    environment: "staging",
    uptime: 92.14,
    owner: "Messaging Team",
    lastDeployment: "Yesterday",
  },
];
