import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserRoleBadge } from "./UserRoleBadge";

import type { UserRole } from "@/features/users/api";

const roles: UserRole[] = [
  "administrator",
  "engineering-manager",
  "tech-lead",
  "developer",
  "viewer",
];

const meta = {
  title: "Badges/UserRoleBadge",
  component: UserRoleBadge,
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: roles,
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UserRoleBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    role: "administrator",
  },
};

export const AllRoles: Story = {
  args: {
    role: "administrator",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {roles.map((role) => (
        <UserRoleBadge key={role} role={role} />
      ))}
    </div>
  ),
};
