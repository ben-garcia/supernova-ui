import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Box, CheckboxGroup, Paragraph } from '@components';
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
  component: CheckboxGroup.Root,
  title: 'Supernova UI/Form/CheckboxGroup',
} as Meta<typeof CheckboxGroup.Root>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

const ControlledTemplate: StoryFn<typeof CheckboxGroup.Root> = args => {
  const [frameworks, setFrameworks] = useState<string[]>(['react']);

  return (
    <Box>
      <Box marginTop="var(--snui-space-md)" marginBottom="var(--snui-space-md)">
        <Paragraph
          marginTop="var(--snui-space-sm)"
          marginBottom="var(--snui-space-sm)"
        >
          Favorite framework/library
        </Paragraph>
        <CheckboxGroup.Root
          {...args}
          name="framework"
          value={frameworks}
          onChange={setFrameworks}
        >
          <CheckboxGroup.Item label="angular" value="angular" />
          <CheckboxGroup.Item label="react" value="react" />
          <CheckboxGroup.Item label="vue" value="vue" />
        </CheckboxGroup.Root>
      </Box>
      <Paragraph>value: [{frameworks.join(' ')}]</Paragraph>
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

const UncontrolledTemplate: StoryFn<typeof CheckboxGroup.Root> = args => {
  return (
    <Box>
      <Box marginTop="var(--snui-space-md)" marginBottom="var(--snui-space-md)">
        <Paragraph
          marginTop="var(--snui-space-sm)"
          marginBottom="var(--snui-space-sm)"
        >
          Favorite framework/library
        </Paragraph>
        <CheckboxGroup.Root {...args} name="framework" defaultValue={['react']}>
          <CheckboxGroup.Item label="angular" value="angular" />
          <CheckboxGroup.Item label="react" value="react" />
          <CheckboxGroup.Item label="vue" value="vue" />
        </CheckboxGroup.Root>
      </Box>
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
