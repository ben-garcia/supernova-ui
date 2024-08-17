import { Meta } from '@storybook/react';

import { colors } from '@utils';
import Tag from '.';

export default {
  args: { colorVariant: 'primary', size: 'md', variant: 'solid' },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
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
