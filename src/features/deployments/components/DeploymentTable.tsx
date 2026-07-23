import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Card } from "@/components/ui";
import { DataTable } from "@/components/data-table";

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
    return <Card className="p-6">Loading deployments...</Card>;
  }

  if (isError) {
    return <Card className="p-6">Failed to load deployments.</Card>;
  }

  return <DataTable table={table} />;
}
