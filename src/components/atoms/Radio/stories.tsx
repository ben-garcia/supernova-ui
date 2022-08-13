import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { colors } from '@utils';
import { Radio, RadioGroup } from '.';
import { UserIcon } from '../Icon/Icons';

export default {
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    direction: {
      control: { type: 'radio' },
      defaultValue: 'row',
      options: ['column', 'row'],
    },
    label: { control: 'text' },
    isDisabled: {
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Radio,
  title: 'Supernova UI/Atoms/Radio',
} as ComponentMeta<typeof Radio>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
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
          <Radio label="angular" value="angular" />
          <Radio label="react" value="react" />
          <Radio label="vue" value="vue" />
        </RadioGroup>
      </div>
    </div>
  );
};

export const WithRadioGroup = RadioGroupTemplate.bind({});
WithRadioGroup.args = {};
WithRadioGroup.parameters = { controls: { include: ['direction'] } };

const WithComponentAsLabelTemplate: ComponentStory<any> = args => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Radio
      isChecked={checked}
      onChange={e => setChecked(e.target.checked)}
      label={
        <>
          <UserIcon size="1rem" />
          <div>this is a custom label</div>
        </>
      }
      {...args}
    />
  );
};

export const WithComponentAsLabel = WithComponentAsLabelTemplate.bind({});
WithComponentAsLabel.args = {};
WithComponentAsLabel.parameters = {
  controls: {
    include: ['colorVariant', 'isDisabled', 'size'],
  },
};
