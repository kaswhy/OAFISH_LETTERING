import WishModalContent from "./WishModalContent";

export default {
  title: "UI/ModalContent/Wish",
  component: WishModalContent,
  tags: ["autodocs"],
  args: {
    text: "저는 오피쉬의 정말 왕...\n줄바꿈 테스트",
    author: "오피쉬",
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
