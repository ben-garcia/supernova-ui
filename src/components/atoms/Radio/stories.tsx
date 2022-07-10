import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@molecules/index';

import { Radio, RadioGroup } from '.';
import { UserIcon } from '../Icon/Icons';

export default {
  argTypes: {
    backgroundColor: {
      control: 'color',
      defaultValue: '#0273b0',
    },
    direction: {
      control: { type: 'radio' },
      defaultValue: 'row',
      options: ['column', 'row'],
    },
    fontSize: {
      control: 'text',
      defaultValue: 'md',
    },
    label: { control: 'text' },
    isDisabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  component: Radio,
  title: 'Supernova UI/Atoms/Radio',
} as ComponentMeta<typeof Radio>;

const parameters = {
  controls: {
    include: [
      'backgroundColor',
      'direction',
      'fontSize',
      'label',
      'isDisabled',
    ],
  },
};
const label = 'Reveal your secrets?';

const Template: ComponentStory<typeof Radio> = args => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Radio
      onChange={e => setChecked(e.target.checked)}
      isChecked={checked}
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = { label };
Basic.parameters = parameters;

const RadioGroupTemplate: ComponentStory<any> = args => {
  const [framework, setFramework] = React.useState('react');
  return (
    <div className="snui-flex snui-flex-column snui-flex-center">
      <div className="snui-margin-y-md">
        <p className="snui-margin-y-sm">Favorite framework/library</p>
        <RadioGroup
          defaultValue={framework}
          direction={args.direction}
          name="frameworks"
          onChange={setFramework}
        >
          <Radio label="angular" {...args} margin="0 sm" value="angular" />
          <Radio label="react" {...args} margin="0 sm" value="react" />
          <Radio label="vue" {...args} margin="0 sm" value="vue" />
        </RadioGroup>
      </div>
    </div>
  );
};

export const WithRadioGroup = RadioGroupTemplate.bind({});
WithRadioGroup.args = {};
WithRadioGroup.parameters = parameters;

const WithComponentAsLabelTemplate: ComponentStory<any> = args => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Radio
      isChecked={checked}
      onChange={e => setChecked(e.target.checked)}
      label={
        <>
          <UserIcon margin="0 0.5rem 0 0" size="1rem" />
          <div>this is a custom label</div>
        </>
      }
      {...args}
      margin="0 sm"
    />
  );
};

export const WithComponentAsLabel = WithComponentAsLabelTemplate.bind({});
WithComponentAsLabel.args = {};
WithComponentAsLabel.parameters = parameters;

const WithFormControlTemplate: ComponentStory<any> = args => {
  const [answer, setAnswer] = React.useState('3.14159');

  return (
    <FormControl isInvalid={answer !== '3.14159'}>
      <RadioGroup
        {...args}
        defaultValue={answer}
        name="answer"
        onChange={setAnswer}
      >
        <Radio label="3.14195" margin="0 sm" value="3.14195" />
        <Radio label="3.15149" margin="0 sm" value="3.15249" />
        <Radio label="3.14159" margin="0 sm" value="3.14159" />
      </RadioGroup>
      <FormHelperText>Choose the correct value of PI</FormHelperText>
      <FormErrorMessage>error has been detected</FormErrorMessage>
    </FormControl>
  );
};

export const WithFormControl = WithFormControlTemplate.bind({});
WithFormControl.args = {};
WithFormControl.parameters = parameters;
