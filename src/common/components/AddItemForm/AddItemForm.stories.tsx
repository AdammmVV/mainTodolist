import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';

export default {
  title: 'AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  // name: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  // label: 'Button',
};

export const Large = Template.bind({});
Large.args = {};

export const Small = Template.bind({});
Small.args = {};
