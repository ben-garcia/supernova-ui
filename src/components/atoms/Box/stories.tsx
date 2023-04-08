import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Box from '.';

const tagOptions = ['article', 'div', 'footer', 'header', 'section'];

export default {
  argTypes: {
    tag: {
      control: 'select',
      defaultValue: 'div',
      options: tagOptions,
    },
  },
  component: Box,
  title: 'Supernova UI/Atoms/Box',
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => <Box {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'This is a box',
};
Basic.parameters = {
  controls: { include: ['tag'] },
};
