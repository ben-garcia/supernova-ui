import React from 'react';
import { Meta, Story } from '@storybook/react';

import Spinner from '.';
import argTypes from './argTypes';

import { SpinnerProps } from './types';

export default {
  argTypes,
  title: 'Supernova UI/Atoms/Spinner',
} as Meta;

const Template: Story<SpinnerProps> = args => <Spinner {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Sizes = () => (
  <div className="snui-flex">
    <Spinner size="xxl" />
    <Spinner size="xl" />
    <Spinner size="lg" />
    <Spinner size="md" />
    <Spinner size="sm" />
    <Spinner size="xs" />
  </div>
);
