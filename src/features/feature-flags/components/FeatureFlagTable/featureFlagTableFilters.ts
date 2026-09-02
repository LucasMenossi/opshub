import type { DataTableFilter } from "@/components/DataTable";

import type { FeatureFlagTableRow } from "../../types";

import { createUniqueFilterOptions } from "@/lib/table";

export function getFeatureFlagTableFilters(
  data: FeatureFlagTableRow[],
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
      columnId: "ownerName",
      label: "Owner",
      options: createUniqueFilterOptions(
        data,
        (featureFlag) => featureFlag.ownerName,
      ),
    },
  ];
}
