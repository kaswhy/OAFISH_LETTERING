import InputText from "./InputText";

export default {
  title: "UI/InputText",
  component: InputText,
  tags: ["autodocs"],
  args: {
    value: "",
    placeholder: "닉네임을 입력해주세요 (10자 이하, 특수문자 불가)",
    size: "md",
    variant: "default",
  },
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    variant: { control: "radio", options: ["default", "error", "disabled"] },
    onChange: { action: "changed" },
  },
};

export const Default = {};

export const Filled = {
  args: { value: "닉네임 입력 완료" },
};

export const Error = {
  args: {
    variant: "error",
    value: "잘못된 입력",
    size: "sm"
  },
};

export const Disabled = {
  args: { variant: "disabled", value: "비활성화" },
};
