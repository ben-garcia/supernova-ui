import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import {
  Box,
  Button,
  Paragraph,
  SearchIcon,
  TextInput,
  UserIcon,
} from '@components';

export default {
  args: {
    isDisabled: false,
    size: 'md',
    variant: 'outline',
  },
  argTypes: {
    isDisabled: { control: 'boolean', defaultValue: false },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: TextInput,
  title: 'Supernova UI/Form/TextInput',
} as Meta<typeof TextInput>;

const label = 'Reveal your secrets here';
const parameters = {
  controls: {
    include: [
      'finalLabelTransform',
      'floatLabel',
      'initialLabelTransform',
      'isDisabled',
      'size',
      'variant',
    ],
  },
};

const ControlledTemplate: StoryFn<typeof TextInput> = args => {
  const [value, setValue] = useState('');
  return (
    <Box width="250px">
      <TextInput
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        label={label}
      />
      <Paragraph>{`value: ${JSON.stringify(value)}`}</Paragraph>
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

const UncontrolledTemplate: StoryFn<typeof TextInput> = args => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');
  const handleClick = () => setValue(inputRef.current!.value);
  return (
    <Box width="250px">
      <TextInput {...args} ref={inputRef} defaultValue="val" label={label} />
      <Button onClick={handleClick}>Get Value</Button>
      <Paragraph>{`value: ${value}`}</Paragraph>
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

export const WithIcons = {
  render: ControlledTemplate,
  args: {
    label,
    leftIcon: <UserIcon height="100%" width="100" />,
    rightIcon: <SearchIcon height="100%" width="100" />,
  },
  parameters,
};

export const WithLeftIcon = {
  render: ControlledTemplate,
  args: {
    label,
    leftIcon: <UserIcon height="100%" width="100" />,
  },
  parameters,
};

export const WithRightIcon = {
  render: ControlledTemplate,
  args: {
    label,
    rightIcon: <SearchIcon height="100%" width="100" />,
  },
  parameters,
};
