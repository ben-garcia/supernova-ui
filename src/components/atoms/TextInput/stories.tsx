import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import TextInput from '.';
import { UserIcon, SearchIcon } from '../Icon/Icons';

export default {
  argTypes: {
    isDisabled: { control: 'boolean', defaultValue: false },
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'outline',
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: TextInput,
  title: 'Supernova UI/Atoms/TextInput',
} as ComponentMeta<typeof TextInput>;

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

const Template: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = { label };
Basic.parameters = parameters;

const WithIconsTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  label,
  leftIcon: <UserIcon />,
  rightIcon: <SearchIcon />,
};

const WithLeftIconTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
export const WithLeftIcon = WithLeftIconTemplate.bind({});
WithLeftIcon.args = {
  label,
  leftIcon: <UserIcon />,
};
WithLeftIcon.parameters = parameters;

const WithRightIconTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);
export const WithRightIcon = WithRightIconTemplate.bind({});
WithRightIcon.args = {
  label,
  rightIcon: <SearchIcon />,
};
WithRightIcon.parameters = parameters;
