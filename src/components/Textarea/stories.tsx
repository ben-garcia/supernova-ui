import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, Paragraph, Textarea } from '@components';

export default {
  args: {
    isAutoResize: true,
    isDiabled: false,
    variant: 'outline',
  },
  argTypes: {
    isAutoResize: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: Textarea,
  title: 'Supernova UI/Form/Textarea',
} as Meta<typeof Textarea>;

const parameters = {
  controls: {
    include: ['isAutoResize', 'isDisabled', 'variant'],
  },
};
const label = 'Reveal your secrets';

const ControlledTemplate: StoryFn<typeof Textarea> = args => {
  const [value, setValue] = useState('');
  return (
    <Box width="250px">
      <Textarea
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
  parameters,
};

const UncontrolledTemplate: StoryFn<typeof Textarea> = args => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState('');
  const handleClick = () => setValue(inputRef.current!.value);
  return (
    <Box width="250px">
      <Textarea {...args} ref={inputRef} defaultValue="val" label={label} />
      <Button onClick={handleClick}>Get Value</Button>
      <Paragraph>{`value: ${value}`}</Paragraph>
    </Box>
  );
};

export const Uncontrolled = {
  render: UncontrolledTemplate,
  parameters,
};
