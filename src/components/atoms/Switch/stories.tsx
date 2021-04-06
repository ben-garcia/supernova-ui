import { Meta } from '@storybook/react';
import React from 'react';

import Switch from '.';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Switch,
  title: 'Supernova UI/Atoms/Switch',
} as Meta;

const label = 'Reveal your secrets?';

export const Disabled = () => <Switch isDisabled label={label} />;

export const Default = () => <Switch label={label} />;

export const Sizes = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Switch isChecked label={label} margin="0 sm" size="xs" />
    <Switch isChecked label={label} margin="0 sm" size="sm" />
    <Switch isChecked label={label} margin="0 sm" size="md" />
    <Switch isChecked label={label} margin="0 sm" size="lg" />
    <Switch isChecked label={label} margin="0 sm" size="xl" />
    <Switch isChecked label={label} margin="0 sm" size="xxl" />
  </div>
);
