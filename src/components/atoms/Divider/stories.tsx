import { Meta, Story } from '@storybook/react';
import React from 'react';

import Divider, { DividerProps } from '.';

export default {
  component: Divider,
  title: 'Supernova UI/Atoms/Divider',
} as Meta;

const Template: Story<DividerProps> = args => (
  <div
    style={{ height: args.orientation === 'vertical' ? '300px' : undefined }}
  >
    <Divider {...args} />
  </div>
);

export const Horizontal = Template.bind({});

Horizontal.args = {};

export const Vertical = Template.bind({});

Vertical.args = {
  orientation: 'vertical',
};
