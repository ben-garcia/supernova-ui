import { Meta } from '@storybook/react';
import React from 'react';

import Textarea from '.';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Textarea,
  title: 'Supernova UI/Atoms/Textarea',
} as Meta;

const label = 'Reveal your secrets here';

export const Disabled = () => <Textarea isDisabled label={label} />;

export const Filled = () => <Textarea label={label} variant="filled" />;

export const Flushed = () => <Textarea label={label} variant="flushed" />;

export const Outline = () => <Textarea label={label} variant="outline" />;

export const FloatingLabel = () => (
  <div>
    <Textarea floatLabel label="Filled" margin="sm 0" variant="filled" />
    <Textarea floatLabel label="Flushed" margin="sm 0" variant="flushed" />
    <Textarea floatLabel label="Outline" margin="sm 0" variant="outline" />
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

export const WithHoverBackgroundAndColor = () => (
  <Textarea
    hoverBackgroundColor="error700"
    hoverColor="warning500"
    label={label}
  />
);
