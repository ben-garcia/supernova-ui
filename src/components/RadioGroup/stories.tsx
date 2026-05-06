import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Box, Paragraph, RadioGroup, UserIcon } from '@components';
import { colors } from '@utils';

export default {
  args: {
    colorVariant: 'primary',
    isDiabled: false,
    size: 'md',
  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    direction: {
      control: { type: 'radio' },
      defaultValue: 'row',
      options: ['column', 'row'],
    },
    label: { control: 'text' },
    isDisabled: {
      control: 'boolean',
    },
    size: {
      control: { type: 'select' },
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: RadioGroup.Root,
  title: 'Supernova UI/Form/RadioGroup',
} as Meta<typeof RadioGroup.Root>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

const ControlledTemplate: StoryFn<typeof RadioGroup.Root> = args => {
  const [framework, setFramework] = useState('react');
  const { direction } = args;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box marginTop="var(--snui-space-md)" marginBottom="var(--snui-space-md)">
        <Paragraph
          marginTop="var(--snui-space-sm)"
          marginBottom="var(--snui-space-sm)"
        >
          Favorite framework/library
        </Paragraph>
        <RadioGroup.Root
          value={framework}
          direction={direction}
          name="framework"
          onChange={setFramework}
        >
          <RadioGroup.Item label="angular" value="angular" />
          <RadioGroup.Item label="react" value="react" />
          <RadioGroup.Item label="vue" value="vue" />
        </RadioGroup.Root>
      </Box>
      <Paragraph>{`value: ${JSON.stringify(framework)}`}</Paragraph>
    </Box>
  );
};

export const Controlled = {
  render: ControlledTemplate,
  args: {},
  parameters: { controls: { include: ['direction'] } },
};

const UncontrolledTemplate: StoryFn<typeof RadioGroup.Root> = args => {
  const [framework, setFramework] = useState('react');
  return (
    <>
      <RadioGroup.Root
        {...args}
        defaultValue="react"
        onChange={value => setFramework(value)}
        name="framework"
      >
        <RadioGroup.Item label="Angular" value="angular" />
        <RadioGroup.Item label="React" value="react" />
        <RadioGroup.Item label="Vue" value="vue" />
      </RadioGroup.Root>
      <Paragraph>framework: {JSON.stringify(framework)}</Paragraph>
    </>
  );
};

export const Uncontrolled = {
  render: UncontrolledTemplate,
  args: {
    label,
  },
  parameters,
};

const WithComponentAsLabelTemplate: StoryFn<typeof RadioGroup.Root> = args => {
  const [checked, setChecked] = React.useState('false');
  return (
    <RadioGroup.Root onChange={setChecked} value={checked} {...args}>
      <RadioGroup.Item
        value={10}
        label={
          <>
            <UserIcon size="xs" />
            <Box>this is a custom label</Box>
          </>
        }
      />
    </RadioGroup.Root>
  );
};

export const WithComponentAsLabel = {
  render: WithComponentAsLabelTemplate,
  args: {},

  parameters: {
    controls: {
      include: ['colorVariant', 'isDisabled', 'size'],
    },
  },
};
