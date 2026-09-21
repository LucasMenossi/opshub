import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Input, Select } from "../UI";
import { DataTableToolbar } from "./DataTableToolbar";

const meta = {
  title: "DataTable/DataTableToolbar",
  component: DataTableToolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof DataTableToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Filter</Button>,
  },
};

export const WithFilters: Story = {
  args: {
    children: (
      <>
        <Input placeholder="Search..." className="w-64" />
        <Select defaultValue="" className="w-40">
          <option value="" disabled>
            Status
          </option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Button>Clear filters</Button>
      </>
    ),
  },
};

export const Wrapping: Story = {
  args: {
    children: (
      <>
        <Input placeholder="Search..." className="w-64" />
        <Select defaultValue="" className="w-40">
          <option value="" disabled>
            Environment
          </option>
          <option value="production">Production</option>
          <option value="staging">Staging</option>
          <option value="development">Development</option>
        </Select>
        <Select defaultValue="" className="w-40">
          <option value="" disabled>
            Status
          </option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Button>Apply filters</Button>
        <Button variant="ghost">Clear</Button>
      </>
    ),
  },
};
