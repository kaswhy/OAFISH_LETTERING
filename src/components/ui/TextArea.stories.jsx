import { useState } from "react";
import TextArea from "./TextArea";

export default {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    maxLength: { control: { type: "number", min: 0, step: 10 } },
    placeholder: { control: "text" },
  },
};

const Template = (args) => {
  const [val, setVal] = useState(args.value ?? "");
  return <TextArea {...args} value={val} onChange={setVal} />;
};

export const Empty = Template.bind({});
Empty.args = {
  value: "",
  placeholder: "이루고 싶은 것을 적어보세요",
  maxLength: 200,
  useGrapheme: true,
};

export const Filled = Template.bind({});
Filled.args = {
  value: "이루고 싶은 것 작성중~",
  maxLength: 200,
  useGrapheme: true,
};
