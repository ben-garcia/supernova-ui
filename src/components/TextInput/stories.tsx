import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Paragraph,
  SearchIcon,
  TextInput,
  UserIcon,
} from '@components';

export default {
  args: {
    isDisabled: false,
  },
  argTypes: {
    isDisabled: { control: 'boolean', defaultValue: false },
  },
  component: TextInput,
  title: 'Supernova UI/Form/TextInput',
} as Meta<typeof TextInput>;

const label = 'Reveal your secrets here';
const parameters = {
  controls: {
    include: ['isDisabled'],
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

const SizesAndVariantsTemplate: StoryFn<typeof TextInput> = args => {
  return (
    <Box display="flex" flexWrap="wrap" gap="10px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Heading level={1} size="md">
          Outline
        </Heading>
        <TextInput {...args} label="sm" size="sm" variant="outline" />
        <TextInput {...args} label="md" size="md" variant="outline" />
        <TextInput {...args} label="lg" size="lg" variant="outline" />
      </Box>
      <Box display="flex" flexDirection="column" gap="10px">
        <Heading level={1} size="md">
          Filled
        </Heading>
        <TextInput {...args} label="sm" size="sm" variant="filled" />
        <TextInput {...args} label="md" size="md" variant="filled" />
        <TextInput {...args} label="lg" size="lg" variant="filled" />
      </Box>
      <Box display="flex" flexDirection="column" gap="10px">
        <Heading level={1} size="md">
          Flushed
        </Heading>
        <TextInput {...args} label="sm" size="sm" variant="flushed" />
        <TextInput {...args} label="md" size="md" variant="flushed" />
        <TextInput {...args} label="lg" size="lg" variant="flushed" />
      </Box>
    </Box>
  );
};

export const SizesAndVariants = {
  render: SizesAndVariantsTemplate,
  parameters,
};

export const Disabled = {
  render: SizesAndVariantsTemplate,
  args: {
    isDisabled: true,
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
