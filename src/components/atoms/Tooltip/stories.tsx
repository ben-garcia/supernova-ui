import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Box, Button } from '@atoms';
import Tooltip from '.';

const parameters = {
  controls: {
    include: ['content', 'placement', 'withArrow'],
  },
};

export default {
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      defaultValue: 'bottom',
      options: ['bottom', 'left', 'right', 'top'],
    },
    withArrow: { control: 'boolean', defaultValue: true },
  },
  component: Tooltip,
  title: 'Supernova UI/Atoms/Tooltip',
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => (
  <Box>
    <Tooltip {...args} />
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'Hover me',
  content: 'this is the label',
};
Basic.parameters = parameters;

const WithButtonTemplate: ComponentStory<typeof Tooltip> = args => (
  <Tooltip {...args}>
    <Button>button</Button>
  </Tooltip>
);

export const WithButton = WithButtonTemplate.bind({});
WithButton.args = { content: 'this is a Button' };
WithButton.parameters = parameters;
