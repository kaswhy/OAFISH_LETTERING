import Modal from "./Modal";

export default {
  title: "UI/Modal/Base",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "grey", values: [{ name: "grey", value: "#ddd" }] },
  },
  args: { open: true },
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
  args: { children: <div style={{ padding: 8 }}>모달 내용</div> },
};
export const Closed = { args: { open: false } };
