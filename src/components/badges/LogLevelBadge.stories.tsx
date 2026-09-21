import type { Meta, StoryObj } from "@storybook/react-vite";

import { LogLevelBadge } from "./LogLevelBadge";

import type { LogSeverity } from "@/features/logs/api";

const severities: LogSeverity[] = [
  "trace",
  "debug",
  "info",
  "warning",
  "error",
  "fatal",
];

const meta = {
  title: "Badges/LogLevelBadge",
  component: LogLevelBadge,
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: "select",
      options: severities,
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LogLevelBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    severity: "trace",
  },
};

export const AllSeverities: Story = {
  args: {
    severity: "trace",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {severities.map((severity) => (
        <LogLevelBadge key={severity} severity={severity} />
      ))}
    </div>
  ),
};
