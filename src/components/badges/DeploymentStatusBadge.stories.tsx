import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeploymentStatusBadge } from "./DeploymentStatusBadge";

import type { DeploymentStatus } from "@/features/deployments/api";

const statuses: DeploymentStatus[] = [
  "pending",
  "running",
  "successful",
  "failed",
  "cancelled",
];

const meta = {
  title: "Badges/DeploymentStatusBadge",
  component: DeploymentStatusBadge,
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
} satisfies Meta<typeof DeploymentStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "pending",
  },
};

export const AllStatuses: Story = {
  args: {
    status: "pending",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <DeploymentStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
