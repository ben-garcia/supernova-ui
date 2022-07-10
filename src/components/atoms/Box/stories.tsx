import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Box from '.';

export default {
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    color: {
      control: 'color',
    },
  },
  component: Box,
  title: 'Supernova UI/Atoms/Box',
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => (
  <Box {...args}>This is a Box</Box>
);

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
  controls: { exclude: ['className'] },
};
