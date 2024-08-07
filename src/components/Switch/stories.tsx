import { Meta, StoryFn } from '@storybook/react';
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
} as Meta<typeof Switch>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

export const Basic = {
  args: { label },
  parameters: parameters,
};

const ControlledTemplate: StoryFn<typeof Switch> = () => {
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

export const Controlled = {
  render: ControlledTemplate,
  args: { label },
  parameters: parameters,
};
