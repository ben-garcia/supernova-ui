import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Spinner from '.';

export default {
  argTypes: {
    borderWidth: { control: 'text' },
    duration: { control: 'text' },
    primaryColor: { control: 'color', defaultValue: 'info700' },
    secondaryColor: { control: 'color', defaultValue: 'transparent' },
    size: { control: 'text' },
  },
  title: 'Supernova UI/Atoms/Spinner',
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = args => <Spinner {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
Basic.parameters = {
  controls: {
    include: [
      'borderWidth',
      'duration',
      'primaryColor',
      'secondaryColor',
      'size',
    ],
  },
};
