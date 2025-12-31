import Plant from "./Plant";

export default {
  title: "UI/Plant",
  component: Plant,
  tags: ["autodocs"],
  args: {
    type: "daisy",
    label: "닉네임",
    active: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["daisy", "rose", "freesia", "mugung", "susun", "sunflower"],
    },
    onClick: { action: "clicked" },
  },
};

export const Default = {};

export const Active = {
  args: { type: "rose", active: true },
};

export const WithLink = {
  args: { href: "/wishes/123", label: "링크 이동" },
};
