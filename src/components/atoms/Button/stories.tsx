import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Button from '.';
import { ArrowLeftIcon, ArrowRightIcon, UserIcon } from '../Icon/Icons';

export default {
  argTypes: {
    asSubmitButton: {
      control: 'boolean',
      defaultValue: false,
    },
    backgroundColor: {
      control: 'color',
      defaultValue: '#0273b0',
    },
    fontSize: {
      control: 'text',
      defaultValue: 'md',
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
      'asSubmitButton',
      'backgroundColor',
      'fontSize',
      'loadingText',
      'isDisabled',
      'isLoading',
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
  leftIcon: <ArrowLeftIcon fill="#fff" size="xs" />,
};
WithLeftIcon.parameters = parameters;

export const WithIcons = Template.bind({});

WithIcons.args = {
  children: 'Submit',
  leftIcon: <ArrowLeftIcon fill="#fff" size="xs" />,
  rightIcon: <ArrowRightIcon fill="#fff" size="xs" />,
};
WithIcons.parameters = parameters;

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
  children: 'SignIn',
  rightIcon: <ArrowRightIcon fill="#fff" size="xs" />,
};
WithRightIcon.parameters = parameters;

export const AsIcon = Template.bind({});

AsIcon.args = {
  borderRadius: 'xxl',
  children: <UserIcon fill="#000" size="1.5rem" />,
  fontSize: 'sm',
  variant: 'outline',
};
AsIcon.parameters = parameters;
