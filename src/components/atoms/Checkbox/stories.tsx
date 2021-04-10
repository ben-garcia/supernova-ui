import { Meta } from '@storybook/react';
import React from 'react';

import Checkbox from '.';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Checkbox,
  title: 'Supernova UI/Atoms/Checkbox',
} as Meta;

const label = 'Reveal your secrets?';

export const CustomBackgroundColors = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Checkbox
      backgroundColor="error600"
      isChecked
      label="error600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="warning600"
      isChecked
      label="warning600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="success600"
      isChecked
      label="success600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="cyan600"
      isChecked
      label="cyan600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="info400"
      isChecked
      label="info400"
      margin="0 sm"
    />
  </div>
);

export const Disabled = () => <Checkbox isDisabled label={label} />;

export const Default = () => <Checkbox label={label} />;

export const Sizes = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Checkbox isChecked label="xs" margin="0 sm" size="xs" />
    <Checkbox isChecked label="sm" margin="0 sm" size="sm" />
    <Checkbox isChecked label="md" margin="0 sm" size="md" />
    <Checkbox isChecked label="lg" margin="0 sm" size="lg" />
    <Checkbox isChecked label="xl" margin="0 sm" size="xl" />
    <Checkbox isChecked label="xxl" margin="0 sm" size="xxl" />
  </div>
);
