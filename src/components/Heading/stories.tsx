import { Meta } from '@storybook/react';

import Heading from '.';

export default {
  args: {
    level: 1,
    size: 'xl',
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      control: 'select',
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
