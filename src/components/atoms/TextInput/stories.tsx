import { Meta } from '@storybook/react';
import React from 'react';

import TextInput from '.';
import { UserIcon, SearchIcon } from '../Icon/Icons';
import argTypes from './argTypes';

export default {
  argTypes,
  component: TextInput,
  title: 'Supernova UI/Atoms/TextInput',
} as Meta;

const label = 'Reveil your secrets here';

export const Filled = () => <TextInput label={label} variant="filled" />;

export const Flushed = () => <TextInput label={label} variant="flushed" />;

export const Outline = () => <TextInput label={label} variant="outline" />;

export const FloatingLabel = () => (
  <div>
    <TextInput margin="sm 0" floatLabel label="Filled" variant="filled" />
    <TextInput margin="sm 0" floatLabel label="Flushed" variant="flushed" />
    <TextInput margin="sm 0" floatLabel label="Outline" variant="outline" />
  </div>
);

export const InitialAndFinalLabelTransform = () => (
  <TextInput
    finalLabelTransform="translate(1rem) scale(1)"
    floatLabel
    initialLabelTransform="translate(5rem) scale(2)"
    label="Custom"
    margin="sm 0"
  />
);

export const Sizes = () => (
  <div>
    <TextInput label={label} margin="sm 0" size="xs" />
    <TextInput label={label} margin="sm 0" size="sm" />
    <TextInput label={label} margin="sm 0" size="md" />
    <TextInput label={label} margin="sm 0" size="lg" />
    <TextInput label={label} margin="sm 0" size="xl" />
    <TextInput label={label} margin="sm 0" size="xxl" />
  </div>
);

export const WithHoverBackgroundAndColor = () => (
  <TextInput
    hoverBackgroundColor="error700"
    hoverColor="warning500"
    label={label}
  />
);

export const WithIcons = () => (
  <TextInput
    label={label}
    leftIcon={<UserIcon size="1.3rem" />}
    rightIcon={<SearchIcon size="1.3rem" />}
  />
);
export const WithLeftIcon = () => (
  <TextInput label={label} leftIcon={<UserIcon size="1.3rem" />} />
);

export const WithRightIcon = () => (
  <TextInput label={label} rightIcon={<SearchIcon size="1.3rem" />} />
);
