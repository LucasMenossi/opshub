export type ServiceStatus = "healthy" | "degraded" | "down";

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
}

export const serviceHealth: ServiceHealth[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "healthy",
  },
  {
    id: "authentication",
    name: "Authentication",
    status: "healthy",
  },
  {
    id: "payment-service",
    name: "Payment Service",
    status: "degraded",
  },
  {
    id: "notifications",
    name: "Notifications",
    status: "down",
  },
];
