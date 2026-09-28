import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};
