import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import { PageHeader } from "./PageHeader";

import { Button } from "@/components/UI";

const meta = {
  title: "DataDisplay/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    actions: {
      control: false,
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Services",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Services",
    description: "Monitor and manage your application services.",
  },
};

export const WithActions: Story = {
  args: {
    title: "Services",
    description: "Monitor and manage your application services.",
    actions: (
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add service
      </Button>
    ),
  },
};
