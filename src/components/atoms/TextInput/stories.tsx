import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import TextInput from '.';
import { UserIcon, SearchIcon } from '../Icon/Icons';

export default {
  argTypes: {
    finalLabelTransform: { control: 'text', if: { arg: 'floatLabel' } },
    floatLabel: { control: 'boolean', defaultValue: false },
    initialLabelTransform: { control: 'text', if: { arg: 'floatLabel' } },
    isDisabled: { control: 'boolean', defaultValue: false },
    size: {
      control: 'text',
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'filled',
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: TextInput,
  title: 'Supernova UI/Atoms/TextInput',
} as ComponentMeta<typeof TextInput>;

const label = 'Reveal your secrets here';
const parameters = {
  controls: {
    include: [
      'finalLabelTransform',
      'floatLabel',
      'initialLabelTransform',
      'isDisabled',
      'size',
      'variant',
    ],
  },
};

const Template: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = { label };
Basic.parameters = parameters;

const FloatingLabelTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} floatLabel margin="sm 0" />
);

export const FloatingLabel = FloatingLabelTemplate.bind({});
FloatingLabel.args = { floatLabel: true, label };
FloatingLabel.parameters = parameters;

const InitialAndFinalLabelTransformTemplate: ComponentStory<
  typeof TextInput
> = args => (
  <TextInput
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

const WithIconsTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  label,
  leftIcon: <UserIcon size="1.3rem" />,
  rightIcon: <SearchIcon size="1.3rem" />,
};
FloatingLabel.parameters = parameters;

const WithLeftIconTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
export const WithLeftIcon = WithLeftIconTemplate.bind({});
WithLeftIcon.args = {
  label,
  leftIcon: <UserIcon size="1.3rem" />,
};
WithLeftIcon.parameters = parameters;

const WithRightIconTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
export const WithRightIcon = WithRightIconTemplate.bind({});
WithRightIcon.args = {
  label,
  rightIcon: <SearchIcon size="1.3rem" />,
};
WithRightIcon.parameters = parameters;
