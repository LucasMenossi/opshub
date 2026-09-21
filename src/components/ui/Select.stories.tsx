import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./Select";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "",
    children: (
      <>
        <option value="" disabled>
          Select an option
        </option>
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </>
    ),
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "production",
    children: (
      <>
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "production",
    children: (
      <>
        <option value="production">Production</option>
        <option value="staging">Staging</option>
        <option value="development">Development</option>
      </>
    ),
  },
};
