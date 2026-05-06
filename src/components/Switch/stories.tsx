import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, Paragraph, Switch } from '@components';
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
      control: { type: 'select' },
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

const ControlledTemplate: StoryFn<typeof Switch> = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <Box width="250px">
      <Switch
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        label={label}
      />
      <Paragraph>{`checked: ${JSON.stringify(checked)}`}</Paragraph>
    </Box>
  );
};

export const Controlled = {
  render: ControlledTemplate,
  parameters,
};

const UncontrolledTemplate: StoryFn<typeof Switch> = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => setIsChecked(ref.current!.checked);
  return (
    <Box width="250px">
      <Switch defaultChecked={false} label={label} ref={ref} />
      <Button onClick={handleClick}>Get Value</Button>
      <Paragraph>{`checked: ${JSON.stringify(isChecked)}`}</Paragraph>
    </Box>
  );
};

export const Uncontrolled = {
  render: UncontrolledTemplate,
  parameters,
};
