import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Portal from '.';

export default {
  args: {
    isMounted: true,
    },
  argTypes: {
    isMounted: {
      control: 'boolean',
    },
  },
  component: Portal,
  title: 'Supernova UI/Other/Portal',
} as Meta<typeof Portal>;

const Template: StoryFn<typeof Portal> = args => (
  <Portal {...args}>This text has been rendered in a React Portal.</Portal>
);

export const Basic = {
  render: Template,
  parameters: {
    controls: { exclude: ['id'] },
  },
};
