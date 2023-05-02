import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MUIButton } from 'common/components/SuperButton/MUIButton';

export default {
  title: 'SuperButton',
  component: MUIButton,
} as ComponentMeta<typeof MUIButton>;

const Template: ComponentStory<typeof MUIButton> = (args) => <MUIButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
      name: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  // label: 'Button',
};

export const Large = Template.bind({});
Large.args = {

};

export const Small = Template.bind({});
Small.args = {

};
