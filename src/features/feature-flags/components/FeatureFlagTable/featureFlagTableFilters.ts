import type { DataTableFilter } from "@/components/DataTable";

import type { FeatureFlag } from "../../api";
import { createUniqueFilterOptions } from "@/lib/table";

export function getFeatureFlagTableFilters(
  featureFlags: FeatureFlag[],
): DataTableFilter[] {
  return [
    {
      columnId: "enabled",
      label: "Status",
      options: [
        {
          label: "Enabled",
          value: "true",
        },
        {
          label: "Disabled",
          value: "false",
        },
      ],
    },
    {
      columnId: "ownerId",
      label: "Owner",
      options: createUniqueFilterOptions(
        featureFlags,
        (featureFlag) => featureFlag.ownerId,
      ),
    },
  ];
}
