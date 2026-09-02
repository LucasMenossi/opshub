import type { FeatureFlag } from "../api";

export interface FeatureFlagTableRow extends FeatureFlag {
  ownerName: string;
}
