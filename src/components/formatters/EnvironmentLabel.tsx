interface EnvironmentLabelProps {
  environment: "production" | "staging";
}

const labels = {
  production: "Production",
  staging: "Staging",
} as const;

export function EnvironmentLabel({ environment }: EnvironmentLabelProps) {
  return labels[environment];
}
