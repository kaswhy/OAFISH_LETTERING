import Modal from "./Modal";

export default {
  title: "UI/Modal/Base",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "grey", values: [{ name: "grey", value: "#ddd" }] },
  },
  args: {
    open: true,
    size: "md",
    hideCloseButton: false,
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    open: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 360,
          height: "100vh",
          margin: "0 auto",
          position: "relative",
          background: "#ddd",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Open = {
  args: { children: <div style={{ padding: 16 }}>모달 내용</div> },
};

export const Closed = {
  args: { open: false },
};

export const Large = {
  args: { size: "lg", children: <div style={{ padding: 16 }}>큰 모달</div> },
};
