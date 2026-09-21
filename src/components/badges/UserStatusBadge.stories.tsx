import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserStatusBadge } from "./UserStatusBadge";

import type { UserStatus } from "@/features/users/api";

const statuses: UserStatus[] = ["active", "inactive"];

const meta = {
  title: "Badges/UserStatusBadge",
  component: UserStatusBadge,
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
} satisfies Meta<typeof UserStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "active",
  },
};

export const AllStatuses: Story = {
  args: {
    status: "active",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <UserStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
