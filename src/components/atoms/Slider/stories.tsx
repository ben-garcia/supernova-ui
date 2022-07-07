import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Slider, SliderRail, SliderFilledRail, SliderThumb } from '.';

import { SliderProps } from './types';

export default {
  argTypes: {
    activeColor: {
      control: {
        type: 'color',
      },
    },
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    ariaDescribedBy: {
      table: {
        disable: true,
      },
    },
    ariaLabelledBy: {
      table: {
        disable: true,
      },
    },
    ariaValueText: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'select' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'select' },
      },
    },
    step: {
      control: { type: 'number' },
    },
  },
  component: Slider,
  title: 'Supernova UI/Atoms/Slider',
} as Meta;

const Template: Story<SliderProps> = args => {
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

export const Default = Template.bind({});

Default.args = {};

export const StepVertical = () => {
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
      <Slider
        step={15}
        orientation="vertical"
        onChange={setValue}
        value={value}
      >
        <SliderRail>
          <SliderFilledRail />
        </SliderRail>
        <SliderThumb />
      </Slider>
    </div>
  );
};
