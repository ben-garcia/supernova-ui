import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Checkbox from '.';
import { UserIcon } from '../Icon/Icons';

export default {
  argTypes: {
    backgroundColor: {
      control: 'color',
      defaultValue: '#0273b0',
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
  component: Checkbox,
  title: 'Supernova UI/Atoms/Checkbox',
} as ComponentMeta<typeof Checkbox>;

const parameters = {
  controls: {
    include: ['backgroundColor', 'fontSize', 'label', 'isDisabled'],
  },
};
const label = 'Reveal your secrets?';

const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  label,
};
Basic.parameters = parameters;

const ControlledTemplate: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = React.useState(true);

  return (
    <>
      <Checkbox
        {...args}
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        label={label}
      />
      <p>{`checked: ${JSON.stringify(checked)}`}</p>
    </>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  label,
};
Controlled.parameters = parameters;

const WithComponentAsLabelTemplate: ComponentStory<typeof Checkbox> = args => (
  <Checkbox
    {...args}
    isChecked
    label={
      <>
        <UserIcon margin="0 xs" size="1rem" />
        component as label
      </>
    }
    margin="0 sm"
  />
);

export const WithComponentAsLabel = WithComponentAsLabelTemplate.bind({});
WithComponentAsLabel.args = {
  label,
};
WithComponentAsLabel.parameters = parameters;
