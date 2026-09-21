import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined", "flat"],
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "elevated",
    children: (
      <div className="p-6">
        <h3 className="text-base font-semibold">Card title</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This is the default elevated card.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div className="p-6">
        <h3 className="text-base font-semibold">Card title</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This card has no shadow.
        </p>
      </div>
    ),
  },
};

export const Flat: Story = {
  args: {
    variant: "flat",
    children: (
      <div className="p-6">
        <h3 className="text-base font-semibold">Card title</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This card has no border or shadow.
        </p>
      </div>
    ),
  },
};
