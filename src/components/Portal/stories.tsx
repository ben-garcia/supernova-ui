import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Portal from '.';

export default {
  argTypes: {
    isMounted: {
      control: 'boolean',
      defaultValue: true,
    },
  },
  component: Portal,
  title: 'Supernova UI/Atoms/Portal',
} as ComponentMeta<typeof Portal>;

const Template: ComponentStory<typeof Portal> = args => (
  <Portal {...args}>This text has been rendered in a React Portal.</Portal>
);

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
  controls: { exclude: ['id'] },
};
