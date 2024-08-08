import { Meta } from '@storybook/react';

import Paragraph from '.';

export default {
  argTypes: {
    size: {
      control: 'select',
      defaultValue: 'xl',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxl', 'xxxl'],
    },
  },
  component: Paragraph,
  title: 'Supernova UI/Typography/Paragraph',
} as Meta<typeof Paragraph>;

export const Basic = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis nulla a velit suscipit faucibus. Sed mattis ac turpis vel efficitur. Aliquam eget ligula ut diam tincidunt porta.',
  },

  parameters: {
    controls: { include: ['size'] },
  },
};
