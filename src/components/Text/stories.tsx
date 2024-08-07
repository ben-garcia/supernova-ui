import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

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
  argTypes: {
    tag: {
      control: { type: 'select' },
      defaultValue: 'span',
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
