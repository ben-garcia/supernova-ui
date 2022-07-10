import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Divider from '.';

export default {
  argTypes: {
    color: {
      control: 'color',
      defaultValue: 'rgb(183, 189, 200)',
    },
    orientation: {
      control: { type: 'radio' },
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
  },
  component: Divider,
  title: 'Supernova UI/Atoms/Divider',
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => (
  <div
    style={{ height: args.orientation === 'vertical' ? '300px' : undefined }}
  >
    <Divider {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.parameters = {
  controls: {
    include: ['color', 'orientation'],
  },
};
