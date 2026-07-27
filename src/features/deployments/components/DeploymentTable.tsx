import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui";

import { useDeployments } from "../hooks";
import { deploymentColumns } from "./deployment-columns";

export function DeploymentTable() {
  const { data = [], isPending, isError } = useDeployments();

  const table = useReactTable({
    data,
    columns: deploymentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading deployments...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Failed to load deployments.</p>
      </Card>
    );
  }

  return <DataTable table={table} emptyMessage="No deployments found." />;
}
