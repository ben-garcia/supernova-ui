import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TextInput, Textarea } from '@atoms';
import { FormControl, FormHelperText, FormErrorMessage } from '@molecules';

export default {
  argTypes: {
    isDisabled: { control: 'boolean', defaultValue: false },
    isInvalid: { control: 'boolean', defaultValue: false },
    isRequired: { control: 'boolean', defaultValue: false },
    tag: {
      control: 'select',
      defaultValue: 'div',
      options: ['div', 'fieldset'],
    },
  },
  component: FormControl,
  title: 'Supernova UI/Molecules/FormControl',
} as ComponentMeta<typeof FormControl>;

const parameters = {
  controls: {
    include: ['isDisabled', 'isInvalid', 'isRequired', 'tag'],
  },
};

const WithTextareaTemplate: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args}>
    <Textarea label="Content" />
    <FormHelperText>your content</FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const WithTextarea = WithTextareaTemplate.bind({});
WithTextarea.parameters = parameters;

const WithTextInputTemplate: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args}>
    <TextInput label="Username" />
    <FormHelperText>
      your name will be how other users notice you
    </FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const WithTextInput = WithTextInputTemplate.bind({});
WithTextInput.parameters = parameters;
