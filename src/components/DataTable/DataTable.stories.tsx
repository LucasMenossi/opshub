import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import { DataTable } from "./DataTable";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const data: User[] = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Administrator",
    status: "Active",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    name: "David Brown",
    email: "david@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    name: "Eva Davis",
    email: "eva@example.com",
    role: "Tech Lead",
    status: "Active",
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    name: "Grace Wilson",
    email: "grace@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    name: "Henry Moore",
    email: "henry@example.com",
    role: "Developer",
    status: "Active",
  },
];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];

function DataTableDemo({ tableData = data }: { tableData?: User[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable table={table} />;
}

function FilteredEmptyDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "status",
      value: "DoesNotExist",
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DataTable table={table} onClearFilters={() => setColumnFilters([])} />
  );
}

const meta = {
  title: "DataTable/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    table: {
      control: false,
    },
    emptyMessage: {
      control: "text",
    },
    onClearFilters: {
      control: false,
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    table: undefined as never,
  },
  render: () => <DataTableDemo />,
};

export const Empty: Story = {
  args: {
    table: undefined as never,
    emptyMessage: "No users found.",
  },
  render: () => <DataTableDemo tableData={[]} />,
};

export const NoResultsAfterFiltering: Story = {
  args: {
    table: undefined as never,
  },
  render: () => <FilteredEmptyDemo />,
};
