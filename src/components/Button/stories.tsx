import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { colors } from '@utils';
import Button from '.';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
  UserIcon,
} from '../Icon/Icons';

export default {
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    isDisabled: {
      control: 'boolean',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    loadingText: {
      control: 'text',
      defaultValue: '',
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'filled',
      options: ['filled', 'outline'],
    },
  },
  component: Button,
  title: 'Supernova UI/Atoms/Button',
} as ComponentMeta<typeof Button>;

const parameters = {
  controls: {
    include: [
      'colorVariant',
      'loadingText',
      'isDisabled',
      'isLoading',
      'size',
      'variant',
    ],
  },
};

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Submit',
};
Basic.parameters = parameters;

export const WithLeftIcon = Template.bind({});

WithLeftIcon.args = {
  children: 'Back',
  leftIcon: <ArrowLeftIcon color="#fff" />,
};
WithLeftIcon.parameters = parameters;

export const WithIcons = Template.bind({});

WithIcons.args = {
  children: 'Submit',
  leftIcon: <ArrowLeftIcon color="#fff" />,
  rightIcon: <ArrowRightIcon color="#fff" />,
};
WithIcons.parameters = parameters;

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
  children: 'SignIn',
  rightIcon: <ArrowRightIcon color="#fff" />,
};
WithRightIcon.parameters = parameters;

export const AsIcon = Template.bind({});

AsIcon.args = {
  children: <UserIcon color="#000" />,
  variant: 'outline',
};
AsIcon.parameters = parameters;

export const WithCustomSpinner = Template.bind({});

WithCustomSpinner.args = {
  children: 'Custom spinner',
  spinner: <LinkIcon />,
};
WithCustomSpinner.parameters = parameters;
