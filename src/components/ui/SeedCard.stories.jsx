import SeedCard from "./SeedCard";

export default {
  title: "UI/SeedCard",
  component: SeedCard,
  tags: ["autodocs"],
  args: {
    type: "daisy",
    selected: false,
    size: "md",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["daisy", "rose", "freesia", "mugung", "susun", "sunflower"],
    },
    size: {
      control: "radio",
      options: ["md", "lg"],
    },
    onClick: { action: "clicked" },
  },
};

export const Default = {};

export const Selected = {
  args: { selected: true },
};

export const Large = {
  args: { size: "lg" },
};

export const Disabled = {
  args: {
    onClick: undefined,
  },
};
