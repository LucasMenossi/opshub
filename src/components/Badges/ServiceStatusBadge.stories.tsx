import type { Meta, StoryObj } from "@storybook/react-vite";

import { ServiceStatusBadge } from "./ServiceStatusBadge";

import type { ServiceStatus } from "@/features/services/api";

const statuses: ServiceStatus[] = ["healthy", "degraded", "down"];

const meta = {
  title: "Badges/ServiceStatusBadge",
  component: ServiceStatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: statuses,
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ServiceStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "healthy",
  },
};

export const AllStatuses: Story = {
  args: {
    status: "healthy",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <ServiceStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
