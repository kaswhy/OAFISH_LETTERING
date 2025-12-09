import WishModalContent from "./WishModalContent";

export default {
  title: "UI/ModalContent/Wish",
  component: WishModalContent,
  tags: ["autodocs"],
  args: {
    type: "daisy",
    text: "저는 오피쉬의 정말 왕...\n줄바꿈 테스트",
    author: "오피쉬",
    bodyHeight: 200,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["daisy", "rose", "freesia", "mugung", "susun", "sunflower"],
    },
    bodyHeight: { control: "number" },
  },
};

export const Default = {};

export const LongText = {
  args: {
    text: "아주 긴 텍스트...\n".repeat(40),
  },
};
