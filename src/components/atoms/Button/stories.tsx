import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '.';
import { ArrowLeftIcon, ArrowRightIcon, UserIcon } from '../Icon/Icons';
import { ButtonProps } from './types';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Button,
  title: 'Supernova UI/Atoms/Button',
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Submit',
};

export const WithLeftIcon = Template.bind({});

WithLeftIcon.args = {
  children: 'Back',
  leftIcon: <ArrowLeftIcon fill="#fff" size="xs" />,
};

export const WithIcons = Template.bind({});

WithIcons.args = {
  children: 'Submit',
  leftIcon: <ArrowLeftIcon fill="#fff" size="xs" />,
  rightIcon: <ArrowRightIcon fill="#fff" size="xs" />,
};

export const WithRightIcon = Template.bind({});

WithRightIcon.args = {
  children: 'SignIn',
  rightIcon: <ArrowRightIcon fill="#fff" size="xs" />,
};

export const AsIcon = Template.bind({});

AsIcon.args = {
  borderRadius: 'xxl',
  children: <UserIcon fill="#000" size="1.5rem" />,
  fontSize: 'sm',
  variant: 'outline',
};

export const Sizes = () => (
  <div>
    <UserIcon size="xs" />
    <UserIcon size="sm" />
    <UserIcon size="md" />
    <UserIcon size="lg" />
    <UserIcon size="xl" />
    <UserIcon size="xxl" />
  </div>
);

export const WithHoverBackgroundAndColor = Template.bind({});

WithHoverBackgroundAndColor.args = {
  hoverBackgroundColor: 'error700',
  hoverColor: 'warning500',
  children: 'Submit',
};
