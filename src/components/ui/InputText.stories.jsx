import InputText from "./InputText";

export default {
  title: "UI/InputText",
  component: InputText,
  tags: ["autodocs"],
  args: {
    value: "",
    placeholder: "닉네임을 입력해주세요 (10자 이하, 특수문자 불가)",
  },
  argTypes: {
    value: {control: "text"},
    placeholder: {control: "text"},
    onChange: {action: "changed"},
  }
};

export const Default = {};

export const Filled = {
    args: {value : "닉네임 입력 완료"},
};
