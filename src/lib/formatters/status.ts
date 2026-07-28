import type { ServiceStatus } from "@/features/services/data/services";
import type { DeploymentStatus } from "@/features/deployments/api";

const serviceStatusLabels: Record<ServiceStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

const deploymentStatusLabels: Record<DeploymentStatus, string> = {
  pending: "Pending",
  running: "Running",
  successful: "Successful",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function formatServiceStatus(status: ServiceStatus) {
  return serviceStatusLabels[status];
}

export function formatDeploymentStatus(status: DeploymentStatus) {
  return deploymentStatusLabels[status];
}
