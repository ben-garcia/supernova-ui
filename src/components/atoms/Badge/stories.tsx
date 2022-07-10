import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Badge from '.';

export default {
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    fontSize: {
      control: 'text',
      defaultValue: 'md',
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'solid',
      options: ['outline', 'solid'],
    },
  },
  component: Badge,
  title: 'Supernova UI/Atoms/Badge',
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'badge',
};
Basic.parameters = {
  controls: { include: ['fontSize', 'variant'] },
};
