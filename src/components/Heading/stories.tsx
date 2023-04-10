import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

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
  title: 'Supernova UI/Atoms/Heading',
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Supernova UI',
};
Basic.parameters = {
  controls: { include: ['level', 'size'] },
};
