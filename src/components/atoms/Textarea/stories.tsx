import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Textarea from '.';

export default {
  argTypes: {
    finalLabelTransform: { control: 'text', if: { arg: 'floatLabel' } },
    floatLabel: { control: 'boolean', defaultValue: false },
    initialLabelTransform: { control: 'text', if: { arg: 'floatLabel' } },
    isDisabled: { control: 'boolean', defaultValue: false },
    resize: {
      control: { type: 'select' },
      defaultValue: 'none',
      options: ['both', 'horizontal', 'none', 'vertical'],
    },
    size: {
      control: 'text',
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'filled',
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: Textarea,
  title: 'Supernova UI/Atoms/Textarea',
} as ComponentMeta<typeof Textarea>;

const parameters = {
  controls: {
    include: [
      'finalLabelTransform',
      'floatLabel',
      'initialLabelTransform',
      'resize',
      'size',
      'variant',
    ],
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
  <Textarea {...args} floatLabel margin="sm 0" />
);

export const FloatingLabel = FloatingLabelTemplate.bind({});
FloatingLabel.args = { floatLabel: true, label };
FloatingLabel.parameters = parameters;

const InitialAndFinalLabelTransformTemplate: ComponentStory<
  typeof Textarea
> = args => (
  <Textarea
    {...args}
    finalLabelTransform="translate(5rem, -1rem) scale(1)"
    floatLabel
    initialLabelTransform="translate(5rem) scale(3)"
    label="Custom"
    margin="sm 0"
  />
);

export const InitialAndFinalLabelTransform = InitialAndFinalLabelTransformTemplate.bind(
  {}
);
InitialAndFinalLabelTransform.args = { floatLabel: true, label };
InitialAndFinalLabelTransform.parameters = parameters;
