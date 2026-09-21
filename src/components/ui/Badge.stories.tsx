import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "subtle"],
    },
    tone: {
      control: "select",
      options: ["default", "success", "warning", "danger", "info"],
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "solid",
    tone: "default",
    children: "Default",
  },
};

export const Success: Story = {
  args: {
    variant: "solid",
    tone: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "solid",
    tone: "warning",
    children: "Warning",
  },
};

export const Danger: Story = {
  args: {
    variant: "solid",
    tone: "danger",
    children: "Danger",
  },
};

export const Info: Story = {
  args: {
    variant: "solid",
    tone: "info",
    children: "Info",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outline",
    tone: "success",
    children: "Outlined",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    tone: "default",
    children: "Subtle",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" tone="default">
        Default
      </Badge>

      <Badge variant="solid" tone="success">
        Success
      </Badge>

      <Badge variant="solid" tone="warning">
        Warning
      </Badge>

      <Badge variant="solid" tone="danger">
        Danger
      </Badge>

      <Badge variant="solid" tone="info">
        Info
      </Badge>

      <Badge variant="outline" tone="default">
        Default
      </Badge>

      <Badge variant="outline" tone="success">
        Success
      </Badge>

      <Badge variant="outline" tone="warning">
        Warning
      </Badge>

      <Badge variant="outline" tone="danger">
        Danger
      </Badge>

      <Badge variant="outline" tone="info">
        Info
      </Badge>

      <Badge variant="subtle" tone="default">
        Subtle
      </Badge>
    </div>
  ),
};
