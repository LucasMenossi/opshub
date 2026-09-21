import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTableSkeleton } from "./DataTableSkeleton";

const meta = {
  title: "DataTable/DataTableSkeleton",
  component: DataTableSkeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    columns: {
      control: {
        type: "number",
        min: 1,
        max: 10,
        step: 1,
      },
    },
    rows: {
      control: {
        type: "number",
        min: 1,
        max: 20,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof DataTableSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: 4,
    rows: 10,
  },
};

export const FewRows: Story = {
  args: {
    columns: 4,
    rows: 3,
  },
};

export const ManyColumns: Story = {
  args: {
    columns: 7,
    rows: 10,
  },
};

export const Minimal: Story = {
  args: {
    columns: 2,
    rows: 2,
  },
};
