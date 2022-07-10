import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Switch from '.';

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
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: Switch,
  title: 'Supernova UI/Atoms/Switch',
} as ComponentMeta<typeof Switch>;

const parameters = {
  controls: {
    include: ['backgroundColor', 'fontSize', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />;

export const Basic = Template.bind({});
Basic.args = { label };
Basic.parameters = parameters;

const ControlledTemplate: ComponentStory<typeof Switch> = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <>
      <Switch
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        label={label}
      />
      <p>{`checked: ${JSON.stringify(checked)}`}</p>
    </>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = { label };
Controlled.parameters = parameters;
