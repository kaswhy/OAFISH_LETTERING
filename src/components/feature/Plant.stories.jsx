import Plant from "./Plant"

export default {
  title: "FEATURE/Plant",
  component: Plant,
  tags: ["autodocs"],
  args: {label: "닉네임", active: false},
  argTypes: {
    type: { control: "select", options: ["daisy","rose","freesia","mugung","susun","sunflower"] },
    onClick: { action: "clicked" },
  },
};

export const Default = { args: { type: "daisy" } };
export const Active = { args: { type: "rose", active: true } };
