import SeedCard from "./SeedCard";

export default {
  title: "UI/SeedCard",
  component: SeedCard,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["daisy", "rose", "freesia", "mugung", "susun", "sunflower"],
    },
    onClick: { action: "clicked" },
  },
};

export const Default = {
  args: {
    type: "daisy",
    selected: false,
  },
};

export const Selected = {
  args: {
    type: "rose",
    selected: true,
  },
};
