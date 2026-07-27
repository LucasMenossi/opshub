import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Card } from "@/components/ui";
import { DataTable } from "@/components/data-table";

import { useServices } from "../hooks";
import { serviceColumns } from "./service-columns";

export function ServiceTable() {
  const { data = [], isPending, isError } = useServices();

  const table = useReactTable({
    data,
    columns: serviceColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <Card className="p-6">Loading services...</Card>;
  }

  if (isError) {
    return <Card className="p-6">Failed to load services.</Card>;
  }

  return <DataTable table={table} emptyMessage="No services found." />;
}
