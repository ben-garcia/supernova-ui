import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Textarea,
  TextInput,
} from '@atoms';
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

const WithCheckboxTemplate: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args}>
    <Checkbox label="react" />
    <FormHelperText>This is helper text</FormHelperText>
    <FormErrorMessage>error has been detected</FormErrorMessage>
  </FormControl>
);

export const WithCheckbox = WithCheckboxTemplate.bind({});
WithCheckbox.parameters = parameters;

const WithRadioGroupTemplate: ComponentStory<typeof FormControl> = args => {
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

export const WithRadioGroup = WithRadioGroupTemplate.bind({});
WithRadioGroup.parameters = parameters;

const WithSwitchTemplate: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args}>
    <Switch label="react" />
    <FormHelperText>This is helper text</FormHelperText>
    <FormErrorMessage>error has been detected</FormErrorMessage>
  </FormControl>
);

export const WithSwitch = WithSwitchTemplate.bind({});
WithSwitch.parameters = parameters;

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
