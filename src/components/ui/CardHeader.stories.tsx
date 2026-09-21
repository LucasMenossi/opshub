import type { Meta, StoryObj } from "@storybook/react-vite";

import { CardHeader } from "./CardHeader";

const meta = {
  title: "UI/CardHeader",
  component: CardHeader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  args: {
    title: "Card title",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Card title",
    description: "This is a description for the card.",
  },
};
