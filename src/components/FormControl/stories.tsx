import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import {
  Checkbox,
  RadioGroup,
  Switch,
  Textarea,
  TextInput,
  FormControl,
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
  component: FormControl.Root,
  title: 'Supernova UI/Form/FormControl',
} as Meta<typeof FormControl.Root>;

const parameters = {
  controls: {
    include: ['isDisabled', 'isInvalid', 'isRequired', 'tag'],
  },
};

const WithCheckboxTemplate: StoryFn<typeof FormControl.Root> = args => (
  <FormControl.Root {...args}>
    <Checkbox label="react" />
    <FormControl.HelperText>This is helper text</FormControl.HelperText>
    <FormControl.ErrorMessage>error has been detected</FormControl.ErrorMessage>
  </FormControl.Root>
);

export const WithCheckbox = {
  render: WithCheckboxTemplate,
  parameters,
};

const WithRadioGroupTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [answer, setAnswer] = React.useState('3.14159');
  return (
    <FormControl.Root {...args}>
      <RadioGroup.Root onChange={setAnswer} value={answer} name="answer">
        <RadioGroup.Item label="3.14195" value="3.14195" />
        <RadioGroup.Item label="3.15149" value="3.15249" />
        <RadioGroup.Item label="3.14159" value="3.14159" />
      </RadioGroup.Root>
      <FormControl.HelperText>
        Choose the correct value of PI
      </FormControl.HelperText>
      <FormControl.ErrorMessage>
        error has been detected
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithRadioGroup = {
  render: WithRadioGroupTemplate,
  parameters,
};

const WithSwitchTemplate: StoryFn<typeof FormControl.Root> = args => (
  <FormControl.Root {...args}>
    <Switch label="react" />
    <FormControl.HelperText>This is helper text</FormControl.HelperText>
    <FormControl.ErrorMessage>error has been detected</FormControl.ErrorMessage>
  </FormControl.Root>
);

export const WithSwitch = {
  render: WithSwitchTemplate,
  parameters,
};

const WithTextareaTemplate: StoryFn<typeof FormControl.Root> = args => (
  <FormControl.Root {...args}>
    <Textarea label="Content" />
    <FormControl.HelperText>your content</FormControl.HelperText>
    <FormControl.ErrorMessage>
      this text will not render until isInvalid prop is true
    </FormControl.ErrorMessage>
  </FormControl.Root>
);

export const WithTextarea = {
  render: WithTextareaTemplate,
  parameters,
};

const WithTextInputTemplate: StoryFn<typeof FormControl.Root> = args => (
  <FormControl.Root {...args}>
    <TextInput label="Username" />
    <FormControl.HelperText>
      your name will be how other users notice you
    </FormControl.HelperText>
    <FormControl.ErrorMessage>
      this text will not render until isInvalid prop is true
    </FormControl.ErrorMessage>
  </FormControl.Root>
);

export const WithTextInput = {
  render: WithTextInputTemplate,
  parameters,
};
