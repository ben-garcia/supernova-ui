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

export const Disabled = () => <Checkbox isChecked isDisabled label={label} />;

export const Default = () => <Checkbox isChecked label={label} />;

export const Sizes = () => (
  <div className="_snui-flex _sniu-flex-center">
    <Checkbox isChecked label={label} margin="0 sm" size="xs" />
    <Checkbox isChecked label={label} margin="0 sm" size="sm" />
    <Checkbox isChecked label={label} margin="0 sm" size="md" />
    <Checkbox isChecked label={label} margin="0 sm" size="lg" />
    <Checkbox isChecked label={label} margin="0 sm" size="xl" />
    <Checkbox isChecked label={label} margin="0 sm" size="xxl" />
  </div>
);
