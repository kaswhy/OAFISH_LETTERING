import { useState } from "react";
import TextArea from "./TextArea";

export default {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    value: "",
    maxLength: 200,
    useGrapheme: true,
    placeholder: "이루고 싶은 것을 적어보세요",
    size: "md",
  },
  argTypes: {
    size: { control: "radio", options: ["md", "lg"] },
    useGrapheme: { control: "boolean" },
    value: { control: "text" },
  },
};

export const Default = (args) => {
  const [text, setText] = useState("");
  return <TextArea {...args} value={text} onChange={setText} />;
};

export const WithText = (args) => {
  const [text, setText] = useState("내 목표는 ...");
  return <TextArea {...args} value={text} onChange={setText} />;
};
