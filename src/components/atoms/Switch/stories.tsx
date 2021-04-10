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

export const CustomBackgroundColors = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Switch
      backgroundColor="error600"
      isChecked
      label="error600"
      margin="0 sm"
    />
    <Switch
      backgroundColor="warning600"
      isChecked
      label="warning600"
      margin="0 sm"
    />
    <Switch
      backgroundColor="success600"
      isChecked
      label="success600"
      margin="0 sm"
    />
    <Switch backgroundColor="cyan600" isChecked label="cyan600" margin="0 sm" />
    <Switch backgroundColor="info400" isChecked label="info400" margin="0 sm" />
  </div>
);

export const Disabled = () => <Switch isDisabled label={label} />;

export const Default = () => <Switch label={label} />;

export const Sizes = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Switch isChecked label="xs" margin="0 sm" size="xs" />
    <Switch isChecked label="sm" margin="0 sm" size="sm" />
    <Switch isChecked label="md" margin="0 sm" size="md" />
    <Switch isChecked label="lg" margin="0 sm" size="lg" />
    <Switch isChecked label="xl" margin="0 sm" size="xl" />
    <Switch isChecked label="xxl" margin="0 sm" size="xxl" />
  </div>
);
