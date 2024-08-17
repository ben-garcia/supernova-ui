import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Checkbox } from '@components';
import { colors } from '@utils';

export default {
  args: {
    colorVariant: 'primary',
    isDisabled: false,
    size: 'md',
  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    label: { control: 'text' },
    isDisabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Checkbox,
  title: 'Supernova UI/Form/Checkbox',
} as Meta<typeof Checkbox>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

export const Basic = {
  args: {
    label,
  },
  parameters,
};

const ControlledTemplate: StoryFn<typeof Checkbox> = args => {
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

export const Controlled = {
  render: ControlledTemplate,

  args: {
    label,
  },

  parameters,
};
