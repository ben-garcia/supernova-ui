import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Box,
  Slider,
  SliderRail,
  SliderFilledRail,
  SliderThumb,
} from '@components';

export default {
  argTypes: {
    activeColor: {
      control: {
        type: 'color',
      },
    },
    max: {
      control: { type: 'number', min: 1 },
      defaultValue: 100,
    },
    min: {
      control: { type: 'number', min: 1 },
      defaultValue: 0,
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
    step: {
      control: { type: 'number', min: 1 },
      defaultValue: 1,
    },
  },
  component: Slider,
  title: 'Supernova UI/Atoms/Slider',
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = args => {
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

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
  controls: {
    include: ['activeColor', 'max', 'min', 'orientation', 'size', 'step'],
  },
};
