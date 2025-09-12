// ModalWithWish.stories.jsx
import { useEffect, useState } from "react";
import Modal from "./Modal";
import WishModalContent from "./modal-contents/WishModalContent";

export default {
  title: "UI/Modal/Composed/Wish",
  component: WishModalContent,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["daisy", "rose", "freesia", "mugung", "susun", "sunflower"],
    },
    text: { control: "text" },
    author: { control: "text" },
    open: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 360,
          height: "100vh",
          margin: "0 auto",
          background: "#ddd",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Interactive = {
  args: {
    open: true,
    type: "mugung",
    text: "저는 오피쉬의 정말 왕...\n줄바꿈 테스트",
    author: "오피쉬",
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    useEffect(() => setOpen(args.open), [args.open]); 

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <WishModalContent {...args} />
      </Modal>
    );
  },
};
