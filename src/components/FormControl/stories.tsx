import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import {
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Textarea,
  TextInput,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@components';

export default {
  args: {
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    tag: 'div',
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    tag: {
      control: 'select',
      options: ['div', 'fieldset'],
    },
  },
  component: FormControl,
  title: 'Supernova UI/Form/FormControl',
} as Meta<typeof FormControl>;

const parameters = {
  controls: {
    include: ['isDisabled', 'isInvalid', 'isRequired', 'tag'],
  },
};

const WithCheckboxTemplate: StoryFn<typeof FormControl> = args => (
  <FormControl {...args}>
    <Checkbox label="react" />
    <FormHelperText>This is helper text</FormHelperText>
    <FormErrorMessage>error has been detected</FormErrorMessage>
  </FormControl>
);

export const WithCheckbox = {
  render: WithCheckboxTemplate,
  parameters,
};

const WithRadioGroupTemplate: StoryFn<typeof FormControl> = args => {
  const [answer, setAnswer] = React.useState('3.14159');
  return (
    <FormControl {...args}>
      <RadioGroup onChange={setAnswer} defaultValue={answer} name="answer">
        <Radio label="3.14195" value="3.14195" />
        <Radio label="3.15149" value="3.15249" />
        <Radio label="3.14159" value="3.14159" />
      </RadioGroup>
      <FormHelperText>Choose the correct value of PI</FormHelperText>
      <FormErrorMessage>error has been detected</FormErrorMessage>
    </FormControl>
  );
};

export const WithRadioGroup = {
  render: WithRadioGroupTemplate,
  parameters,
};

const WithSwitchTemplate: StoryFn<typeof FormControl> = args => (
  <FormControl {...args}>
    <Switch label="react" />
    <FormHelperText>This is helper text</FormHelperText>
    <FormErrorMessage>error has been detected</FormErrorMessage>
  </FormControl>
);

export const WithSwitch = {
  render: WithSwitchTemplate,
  parameters,
};

const WithTextareaTemplate: StoryFn<typeof FormControl> = args => (
  <FormControl {...args}>
    <Textarea label="Content" />
    <FormHelperText>your content</FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const WithTextarea = {
  render: WithTextareaTemplate,
  parameters,
};

const WithTextInputTemplate: StoryFn<typeof FormControl> = args => (
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

export const WithTextInput = {
  render: WithTextInputTemplate,
  parameters,
};
