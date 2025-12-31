import SearchInput from "./SearchInput";

export default {
  title: "UI/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

  args: {
    value: "",
    placeholder: "닉네임으로 내 새싹을 찾아보세요",
    size: "md",
  },

  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    size: { control: "radio", options: ["sm", "md"] },
    onSearch: { action: "search" },
    onClear: { action: "clear" },
    onChange: { action: "change" },
  },
};

export const Empty = {};

export const WithValue = {
  args: {
    value: "데이지",
  },
};
