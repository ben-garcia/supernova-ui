import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

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
    isRequired: false,
    tag: 'div',
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
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
    include: ['isDisabled', 'isRequired', 'tag'],
  },
};

const WithCheckboxTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [accept, setAccept] = useState(true);
  return (
    <FormControl.Root isInvalid={!accept} {...args}>
      <Checkbox
        label="By signing up you agree to our Terms and conditions"
        isChecked={accept}
        onChange={e => setAccept(e.target.checked)}
      />
      <FormControl.HelperText>
        Terms and conditions agreements are essential documents that outline the
        rules and guidelines for using a website or service
      </FormControl.HelperText>
      <FormControl.ErrorMessage>
        You must accept our Terms and conditions to continue!
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithCheckbox = {
  render: WithCheckboxTemplate,
  parameters,
};

const WithRadioGroupTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [answer, setAnswer] = React.useState('3.14159');
  return (
    <FormControl.Root {...args} isInvalid={answer !== '3.14159'}>
      <RadioGroup.Root onChange={setAnswer} value={answer} name="answer">
        <RadioGroup.Item label="3.14195" value="3.14195" />
        <RadioGroup.Item label="3.15149" value="3.15249" />
        <RadioGroup.Item label="3.14159" value="3.14159" />
      </RadioGroup.Root>
      <FormControl.HelperText>
        Choose the correct value of PI
      </FormControl.HelperText>
      <FormControl.ErrorMessage>
        This is not the correct value. Try again!
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithRadioGroup = {
  render: WithRadioGroupTemplate,
  parameters,
};

const WithSwitchTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [wifiIsOn, setWifiIsOn] = useState(true);
  return (
    <FormControl.Root {...args} isInvalid={!wifiIsOn}>
      <Switch
        label="WIFI"
        isChecked={wifiIsOn}
        onChange={e => setWifiIsOn(e.target.checked)}
      />
      <FormControl.HelperText>Toggle WIFI On/Off</FormControl.HelperText>
      <FormControl.ErrorMessage>
        There is no internet access. Check your WIFI connection!
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithSwitch = {
  render: WithSwitchTemplate,
  parameters,
};

const WithTextareaTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [text, setText] = useState('');
  return (
    <FormControl.Root {...args} isInvalid={text.length > 100}>
      <Textarea
        label="description"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <FormControl.HelperText>
        Type a brief description about yourself!
      </FormControl.HelperText>
      <FormControl.ErrorMessage>
        Your description should contain no more than 100 characters(including
        spaces)!
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithTextarea = {
  render: WithTextareaTemplate,
  parameters,
};

const WithTextInputTemplate: StoryFn<typeof FormControl.Root> = args => {
  const [text, setText] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <FormControl.Root {...args} isInvalid={!emailRegex.test(text)}>
      <TextInput
        type="email"
        label="email"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <FormControl.HelperText>
        You will receive notifications
      </FormControl.HelperText>
      <FormControl.ErrorMessage>
        The email you supplied is invalid!
      </FormControl.ErrorMessage>
    </FormControl.Root>
  );
};

export const WithTextInput = {
  render: WithTextInputTemplate,
  parameters,
};
