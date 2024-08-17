import { Meta } from '@storybook/react';
import React from 'react';

import { Button } from '@components';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
  UserIcon,
} from '@components/Icon/Icons';
import { colors } from '@utils';

export default {
  args: {
    colorVariant: 'primary',
    isDisabled: false,
    isLoading: false,
    loadingText: '',
    size: 'md',
    variant: 'filled',
  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    isDisabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    loadingText: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outline'],
    },
  },
  component: Button,
  title: 'Supernova UI/Form/Button',
} as Meta<typeof Button>;

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

export const Basic = {
  args: {
    children: 'Submit',
  },

  parameters,
};

export const WithLeftIcon = {
  args: {
    children: 'Back',
    leftIcon: <ArrowLeftIcon color="#fff" />,
  },

  parameters,
};

export const WithIcons = {
  args: {
    children: 'Submit',
    leftIcon: <ArrowLeftIcon color="#fff" />,
    rightIcon: <ArrowRightIcon color="#fff" />,
  },

  parameters,
};

export const WithRightIcon = {
  args: {
    children: 'SignIn',
    rightIcon: <ArrowRightIcon color="#fff" />,
  },

  parameters,
};

export const AsIcon = {
  args: {
    children: <UserIcon color="#000" />,
    variant: 'outline',
  },

  parameters,
};

export const WithCustomSpinner = {
  args: {
    children: 'Custom spinner',
    spinner: <LinkIcon />,
  },

  parameters,
};
