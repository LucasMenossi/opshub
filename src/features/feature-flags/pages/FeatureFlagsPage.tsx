import { PageHeader } from "@/components/DataDisplay";
import { Container } from "@/components/UI";

import { FeatureFlagTable } from "../components";

export function FeatureFlagsPage() {
  return (
    <Container size="xl">
      <div className="space-y-8">
        <PageHeader
          title="Feature Flags"
          description="Manage runtime application features"
        />

        <FeatureFlagTable />
      </div>
    </Container>
  );
}
