import React from 'react';
import { Meta, Story } from '@storybook/react';

import argTypes from './argTypes';
import { SpinnerProps } from './types';

import Spinner from '.';

export default {
  argTypes,
  title: 'Supernova UI/Atoms/Spinner',
} as Meta;

const Template: Story<SpinnerProps> = args => <Spinner {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
