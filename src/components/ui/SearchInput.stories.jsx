import SearchInput from "./SearchInput";

export default {
  title: "UI/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],

  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
  },
};

const Template = (args) => <SearchInput {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  value: "",
  placeholder: "닉네임으로 내 새싹을 찾아보세요",
  onChange: () => {},
  onClear: () => {},
  onSearch: () => alert("검색 버튼 눌림"),
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "닉네임 검색 완료",
  placeholder: "닉네임으로 내 새싹을 찾아보세요",
  onChange: () => {},
  onClear: () => alert("지우기 눌림"),
  onSearch: () => alert("검색 실행"),
};
