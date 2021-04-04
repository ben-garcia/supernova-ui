import { Meta } from '@storybook/react';
import React from 'react';

import Textarea from '.';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Textarea,
  title: 'Supernova UI/Atoms/Textarea',
} as Meta;

const label = 'Reveil your secrets here';

export const Disabled = () => <Textarea isDisabled label={label} />;

export const Filled = () => <Textarea label={label} variant="filled" />;

export const Flushed = () => <Textarea label={label} variant="flushed" />;

export const Outline = () => <Textarea label={label} variant="outline" />;

export const FloatingLabel = () => (
  <div>
    <Textarea margin="sm 0" floatLabel label="Filled" variant="filled" />
    <Textarea margin="sm 0" floatLabel label="Flushed" variant="flushed" />
    <Textarea margin="sm 0" floatLabel label="Outline" variant="outline" />
  </div>
);

export const InitialAndFinalLabelTransform = () => (
  <Textarea
    finalLabelTransform="translate(5rem, -1rem) scale(1)"
    floatLabel
    initialLabelTransform="translate(5rem) scale(3)"
    label="Custom"
    margin="sm 0"
  />
);

export const Resizes = () => (
  <>
    <Textarea
      label="Horizontal"
      margin="sm 0"
      resize="horizontal"
      variant="outline"
    />
    <Textarea
      label="Vertical"
      margin="sm 0"
      resize="vertical"
      variant="outline"
    />
    <Textarea label="Both" margin="sm 0" resize="both" variant="outline" />
  </>
);

export const Sizes = () => (
  <div>
    <Textarea label={label} margin="sm 0" size="xs" />
    <Textarea label={label} margin="sm 0" size="sm" />
    <Textarea label={label} margin="sm 0" size="md" />
    <Textarea label={label} margin="sm 0" size="lg" />
    <Textarea label={label} margin="sm 0" size="xl" />
    <Textarea label={label} margin="sm 0" size="xxl" />
  </div>
);

export const WithHoverBackgroundAndColor = () => (
  <Textarea
    hoverBackgroundColor="error700"
    hoverColor="warning500"
    label={label}
  />
);
