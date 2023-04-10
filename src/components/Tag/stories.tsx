import { ComponentMeta, ComponentStory } from '@storybook/react';
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
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'tag',
};
Basic.parameters = {
  controls: { include: ['colorVariant', 'size', 'variant'] },
};
