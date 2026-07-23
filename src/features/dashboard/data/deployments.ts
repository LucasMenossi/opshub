export type DeploymentStatus = "success" | "running" | "failed";

export interface Deployment {
  id: string;
  service: string;
  version: string;
  status: DeploymentStatus;
  deployedAt: string;
}

export const deployments: Deployment[] = [
  {
    id: "1",
    service: "API Gateway",
    version: "v2.4.1",
    status: "success",
    deployedAt: "5 minutes ago",
  },
  {
    id: "2",
    service: "Authentication",
    version: "v1.18.0",
    status: "running",
    deployedAt: "12 minutes ago",
  },
  {
    id: "3",
    service: "Payment Service",
    version: "v3.2.0",
    status: "failed",
    deployedAt: "1 hour ago",
  },
];
