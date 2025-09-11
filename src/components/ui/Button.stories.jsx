import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "radio", options: ["active", "inactive"] },
  },
};

const Template = (args) => <Button {...args}>내 쪽지 심기</Button>;

export const Active = Template.bind({});
Active.args = { state: "active" };

export const Inactive = Template.bind({});
Inactive.args = { state: "inactive" };
