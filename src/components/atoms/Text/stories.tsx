import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Text from '.';

export default {
  argTypes: {
    fontSize: {
      control: 'text',
    },
    tag: {
      control: { type: 'select' },
      defaultValue: 'span',
      options: [
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
      ],
    },
  },
  component: Text,
  title: 'Supernova UI/Atoms/Text',
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'text',
};
Basic.parameters = {
  controls: { include: ['fontSize', 'tag'] },
};
