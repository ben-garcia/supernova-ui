import { Meta } from '@storybook/react';

import Text from '.';

const tags = [
  'abbr',
  'cite',
  'del',
  'em',
  'i',
  'ins',
  'kdb',
  'mark',
  's',
  'samp',
  'span',
  'sub',
  'sup',
  'u',
];
export default {
  args: { tag: 'span' },
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: tags,
    },
  },
  component: Text,
  title: 'Supernova UI/Typography/Text',
} as Meta<typeof Text>;

export const Basic = {
  args: {
    children: 'text',
  },

  parameters: {
    controls: { include: ['tag'] },
  },
};
