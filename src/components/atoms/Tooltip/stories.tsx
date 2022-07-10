import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Tooltip from '.';
import Button from '../Button';

const parameters = {
  controls: {
    include: ['backgroundColor', 'content', 'color', 'position', 'withArrow'],
  },
};

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
    content: { control: 'text' },
    color: { control: 'color' },
    position: {
      control: 'select',
      defaultValue: 'top',
      options: ['bottom', 'left', 'right', 'top'],
    },
    withArrow: { control: 'boolean', defaultValue: true },
  },
  component: Tooltip,
  title: 'Supernova UI/Atoms/Tooltip',
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => (
  <div className="_snui-flex _snui-flex-center">
    <Tooltip {...args} />
  </div>
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
