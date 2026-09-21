import type { Meta, StoryObj } from "@storybook/react-vite";

import { IncidentSeverityBadge } from "./IncidentSeverityBadge";

import type { IncidentSeverity } from "@/features/incidents/api";

const severities: IncidentSeverity[] = ["low", "medium", "high", "critical"];

const meta = {
  title: "Badges/IncidentSeverityBadge",
  component: IncidentSeverityBadge,
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
} satisfies Meta<typeof IncidentSeverityBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    severity: "low",
  },
};

export const AllSeverities: Story = {
  args: {
    severity: "low",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {severities.map((severity) => (
        <IncidentSeverityBadge key={severity} severity={severity} />
      ))}
    </div>
  ),
};
