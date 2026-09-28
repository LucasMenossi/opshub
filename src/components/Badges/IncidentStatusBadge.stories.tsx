import type { Meta, StoryObj } from "@storybook/react-vite";

import { IncidentStatusBadge } from "./IncidentStatusBadge";

import type { IncidentStatus } from "@/features/incidents/api";

const statuses: IncidentStatus[] = ["open", "investigating", "resolved"];

const meta = {
  title: "Badges/IncidentStatusBadge",
  component: IncidentStatusBadge,
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
} satisfies Meta<typeof IncidentStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "open",
  },
};

export const AllStatuses: Story = {
  args: {
    status: "open",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <IncidentStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
