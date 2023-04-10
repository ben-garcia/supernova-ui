import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Textarea from '.';

export default {
  argTypes: {
    isAutoResize: { control: 'boolean', defaultValue: true },
    isDisabled: { control: 'boolean', defaultValue: false },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'outline',
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: Textarea,
  title: 'Supernova UI/Form/Textarea',
} as ComponentMeta<typeof Textarea>;

const parameters = {
  controls: {
    include: ['isAutoResize', 'isDisabled', 'variant'],
  },
};
const label = 'Reveal your secrets';

const Template: ComponentStory<typeof Textarea> = args => (
  <Textarea {...args} />
);

export const Basic = Template.bind({});
Basic.args = { label };
Basic.parameters = parameters;

const FloatingLabelTemplate: ComponentStory<typeof Textarea> = args => (
  <Textarea {...args} />
);

export const FloatingLabel = FloatingLabelTemplate.bind({});
FloatingLabel.args = { label };
FloatingLabel.parameters = parameters;
