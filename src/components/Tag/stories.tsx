import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { colors } from '@utils';
import Tag from '.';

export default {
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'solid',
      options: ['outline', 'solid'],
    },
  },
  component: Tag,
  title: 'Supernova UI/Data display/Tag',
} as Meta<typeof Tag>;

export const Basic = {
  args: {
    children: 'tag',
  },

  parameters: {
    controls: { include: ['colorVariant', 'size', 'variant'] },
  },
};
