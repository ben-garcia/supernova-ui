import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Paragraph, Switch } from '@components';
import { colors } from '@utils';

export default {
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
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
  component: Switch,
  title: 'Supernova UI/Form/Switch',
} as ComponentMeta<typeof Switch>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
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
      <Paragraph>{`checked: ${JSON.stringify(checked)}`}</Paragraph>
    </>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = { label };
Controlled.parameters = parameters;
