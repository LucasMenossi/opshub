import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, Server } from "lucide-react";

import { MetricCard } from "./MetricCard";

const meta = {
  title: "DataDisplay/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    value: {
      control: "text",
    },
    description: {
      control: "text",
    },
    icon: {
      control: false,
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Active Services",
    value: 24,
  },
};

export const WithDescription: Story = {
  args: {
    title: "Active Services",
    value: 24,
    description: "Across all environments",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Activity",
    value: "98.7%",
    icon: Activity,
  },
};

export const Complete: Story = {
  args: {
    title: "Services",
    value: 42,
    description: "12 services changed today",
    icon: Server,
  },
};
