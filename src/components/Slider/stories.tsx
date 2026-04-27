import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Box, Slider } from '@components';

export default {
  args: {
    activeColor: 'primary',
    max: 100,
    min: 0,
    orientation: 'horizontal',
    size: 'md',
    step: 1,
  },
  argTypes: {
    activeColor: {
      control: {
        type: 'color',
      },
    },
    max: {
      control: { type: 'number', min: 1 },
    },
    min: {
      control: { type: 'number', min: 1 },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    step: {
      control: { type: 'number', min: 1 },
    },
  },
  component: Slider.Root,
  title: 'Supernova UI/Form/Slider',
} as Meta<typeof Slider.Root>;

const Template: StoryFn<typeof Slider.Root> = args => {
  const [value, setValue] = useState(0);

  return (
    <Box display="flex" justifyContent="center" width="150px" height="150px">
      <Slider.Root {...args} onChange={setValue} value={value}>
        <Slider.Rail>
          <Slider.FilledRail />
        </Slider.Rail>
        <Slider.Thumb />
      </Slider.Root>
    </Box>
  );
};

export const Basic = {
  render: Template,
  args: {},

  parameters: {
    controls: {
      include: ['activeColor', 'max', 'min', 'orientation', 'size', 'step'],
    },
  },
};
