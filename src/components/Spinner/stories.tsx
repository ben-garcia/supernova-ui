import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { colors } from '@utils';
import Spinner from '.';

export default {
  argTypes: {
    borderThickness: { control: 'text' },
    duration: { control: 'text' },
    primaryColor: { control: 'select', options: colors },
    secondaryColor: { control: 'select', options: colors },
    size: {
      control: 'select',
      defaultValue: 'lg',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    },
  },
  title: 'Supernova UI/Feedback/Spinner',
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = args => <Spinner {...args} />;

export const Basic = {
  render: Template,
  args: {},

  parameters: {
    controls: {
      include: [
        'borderThickness',
        'duration',
        'primaryColor',
        'secondaryColor',
        'size',
      ],
    },
  },
};
