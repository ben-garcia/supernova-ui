import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Slider, SliderRail, SliderFilledRail, SliderThumb } from '.';

export default {
  argTypes: {
    activeColor: {
      control: {
        type: 'color',
      },
    },
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    step: {
      control: { type: 'number' },
    },
  },
  component: Slider,
  title: 'Supernova UI/Atoms/Slider',
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = args => {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: 150,
        height: 150,
      }}
    >
      <Slider {...args} onChange={setValue} value={value}>
        <SliderRail>
          <SliderFilledRail />
        </SliderRail>
        <SliderThumb />
      </Slider>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
  controls: {
    include: ['activeColor', 'max', 'min', 'orientation', 'size', 'step'],
  },
};
