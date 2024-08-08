import { Meta } from '@storybook/react';

import Heading from '.';

export default {
  argTypes: {
    level: {
      control: 'select',
      defaultValue: 1,
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      control: 'select',
      defaultValue: 'xl',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxl', 'xxxl'],
    },
  },
  component: Heading,
  title: 'Supernova UI/Typography/Heading',
} as Meta<typeof Heading>;

export const Basic = {
  args: {
    children: 'Supernova UI',
  },

  parameters: {
    controls: { include: ['level', 'size'] },
  },
};
