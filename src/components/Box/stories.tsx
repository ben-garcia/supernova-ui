import { Meta, StoryFn } from '@storybook/react';
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
  title: 'Supernova UI/Layout/Box',
} as Meta<typeof Box>;

export const Basic = {
  args: {
    children: 'This is a box',
  },

  parameters: {
    controls: { include: ['tag'] },
  },
};
