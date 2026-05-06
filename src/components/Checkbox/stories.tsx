import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, Checkbox, Paragraph } from '@components';
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

const ControlledTemplate: StoryFn<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(true);

  return (
    <Box>
      <Checkbox
        {...args}
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        label={label}
      />
      <p>{`checked: ${JSON.stringify(checked)}`}</p>
    </Box>
  );
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    label,
  },

  parameters,
};

const UncontrolledTemplate: StoryFn<typeof Checkbox> = args => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(false);
  const handleClick = () => setValue(ref.current!.checked);
  return (
    <Box width="250px">
      <Checkbox {...args} defaultChecked label={label} />
      <Button onClick={handleClick}>Get Value</Button>
      <Paragraph>{`value: ${value ? 'checked' : 'no checked'}`}</Paragraph>
    </Box>
  );
};

export const Uncontrolled = {
  render: UncontrolledTemplate,
  args: {
    label,
  },

  parameters,
};
