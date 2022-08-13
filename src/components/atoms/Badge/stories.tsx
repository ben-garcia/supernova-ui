import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { colors } from '@utils';
import Badge from '.';

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
  component: Badge,
  title: 'Supernova UI/Atoms/Badge',
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'badge',
};
Basic.parameters = {
  controls: { include: ['colorVariant', 'size', 'variant'] },
};
