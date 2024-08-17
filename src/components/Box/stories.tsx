import { Meta } from '@storybook/react';

import Box from '.';

const tagOptions = ['article', 'div', 'footer', 'header', 'section'];

export default {
  args: {
    tag: 'div',
    },
  argTypes: {
    tag: {
      control: 'select',
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
