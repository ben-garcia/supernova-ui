import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

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
  title: 'Supernova UI/Atoms/Paragraph',
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = args => (
  <Paragraph {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis nulla a velit suscipit faucibus. Sed mattis ac turpis vel efficitur. Aliquam eget ligula ut diam tincidunt porta.',
};
Basic.parameters = {
  controls: { include: ['size'] },
};
