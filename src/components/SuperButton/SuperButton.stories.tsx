import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SuperButton } from './SuperButton';

export default {
  title: 'SuperButton',
  component: SuperButton,
} as ComponentMeta<typeof SuperButton>;

const Template: ComponentStory<typeof SuperButton> = (args) => <SuperButton {...args} />;

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
