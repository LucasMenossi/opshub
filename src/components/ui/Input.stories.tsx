import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter a value...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "OpsHub",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
};
