import type { FilterOption } from "@/lib/types/filterOption";

import type { FeatureFlagTableRow } from "../../types";
import { createUniqueFilterOptions } from "@/lib/table";

export function getFeatureFlagFilterOptions(data: FeatureFlagTableRow[]): {
  enabled: FilterOption[];
  owner: FilterOption[];
} {
  return {
    enabled: [
      {
        label: "Enabled",
        value: "true",
      },
      {
        label: "Disabled",
        value: "false",
      },
    ],
    owner: createUniqueFilterOptions(
      data,
      (featureFlag) => featureFlag.ownerName,
    ),
  };
}
