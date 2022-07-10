import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Heading from '.';

export default {
  argTypes: {
    fontSize: {
      control: 'text',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
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
  controls: { include: ['fontSize', 'level'] },
};
