import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, Paragraph, Radio, RadioGroup, UserIcon } from '@components';
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
  component: Radio,
  title: 'Supernova UI/Form/Radio',
} as Meta<typeof Radio>;

const parameters = {
  controls: {
    include: ['colorVariant', 'label', 'isDisabled', 'size'],
  },
};
const label = 'Reveal your secrets?';

const Template: StoryFn<typeof Radio> = args => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Radio
      onChange={e => setChecked(e.target.checked)}
      isChecked={checked}
      {...args}
    />
  );
};

export const Basic = {
  render: Template,
  args: { label },
  parameters,
};

const RadioGroupTemplate: StoryFn<any> = args => {
  const [framework, setFramework] = React.useState('react');
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
        <RadioGroup
          defaultValue={framework}
          direction={direction}
          name="frameworks"
          onChange={setFramework}
        >
          <Radio label="angular" value="angular" />
          <Radio label="react" value="react" />
          <Radio label="vue" value="vue" />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export const WithRadioGroup = {
  render: RadioGroupTemplate,
  args: {},
  parameters: { controls: { include: ['direction'] } },
};

const WithComponentAsLabelTemplate: StoryFn<any> = args => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Radio
      isChecked={checked}
      onChange={e => setChecked(e.target.checked)}
      label={
        <>
          <UserIcon size="xs" />
          <Box>this is a custom label</Box>
        </>
      }
      {...args}
    />
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
