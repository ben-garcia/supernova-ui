import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import TextInput from '.';
import { UserIcon, SearchIcon } from '../Icon/Icons';

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

export const Basic = {
  args: { label },
  parameters,
};

const WithIconsTemplate: StoryFn<typeof TextInput> = args => (
  <TextInput {...args} />
);
const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  label,
  leftIcon: <UserIcon height="100%" width="100" />,
  rightIcon: <SearchIcon height="100%" width="100" />,
};

export const WithLeftIcon = {
  args: {
    label,
    leftIcon: <UserIcon height="100%" width="100" />,
  },

  parameters,
};

export const WithRightIcon = {
  args: {
    label,
    rightIcon: <SearchIcon height="100%" width="100" />,
  },

  parameters,
};
