import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, Divider } from '@components';
import { colors } from '@utils';

export default {
  args: {
    colorVariant: 'gray300',
    orientation: 'horizontal',
    size: 'md',

  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Divider,
  title: 'Supernova UI/Data display/Divider',
} as Meta<typeof Divider>;

// parent element must have a height for
// orientation of vertial to work correctly.
const Template: StoryFn<typeof Divider> = args => {
  const { orientation, ...rest } = args;
  return (
    <Box height={orientation === 'vertical' ? '200px' : undefined}>
      <Divider {...rest} />
    </Box>
  );
};

export const Basic = {
  render: Template,

  parameters: {
    controls: {
      include: ['colorVariant', 'orientation', 'size'],
    },
  },
};
