import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTableError } from "./DataTableError";

const meta = {
  title: "DataTable/DataTableError",
  component: DataTableError,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    isRetrying: {
      control: "boolean",
    },
    onRetry: {
      control: false,
    },
  },
} satisfies Meta<typeof DataTableError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRetry: () => {},
  },
};

export const CustomMessage: Story = {
  args: {
    title: "Failed to load deployments",
    description: "There was a problem retrieving deployment history.",
    onRetry: () => {},
  },
};

export const Retrying: Story = {
  args: {
    isRetrying: true,
    onRetry: () => {},
  },
};
