import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import {
  Box,
  Slider,
  SliderRail,
  SliderFilledRail,
  SliderThumb,
} from '@components';

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
  component: Slider,
  title: 'Supernova UI/Form/Slider',
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = args => {
  const [value, setValue] = React.useState(0);

  return (
    <Box display="flex" justifyContent="center" width="150px" height="150px">
      <Slider {...args} onChange={setValue} value={value}>
        <SliderRail>
          <SliderFilledRail />
        </SliderRail>
        <SliderThumb />
      </Slider>
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
