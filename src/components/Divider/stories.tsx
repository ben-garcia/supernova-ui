import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Box, Divider } from '@components';
import { colors } from '@utils';

export default {
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    orientation: {
      control: { type: 'radio' },
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Divider,
  title: 'Supernova UI/Data display/Divider',
} as ComponentMeta<typeof Divider>;

// parent element must have a height for
// orientation of vertial to work correctly.
const Template: ComponentStory<typeof Divider> = args => (
  <Box height={args.orientation === 'vertical' ? '200px' : undefined}>
    <Divider {...args} />
  </Box>
);

export const Basic = Template.bind({});
Basic.parameters = {
  controls: {
    include: ['colorVariant', 'orientation', 'size'],
  },
};
