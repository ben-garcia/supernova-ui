import { Meta } from '@storybook/react';
import React from 'react';

import { TextInput, Textarea } from '@atoms/index';
import { FormControl, FormHelperText, FormErrorMessage } from '.';

export default {
  component: FormControl,
  title: 'Supernova UI/Molecules/FormControl',
} as Meta;

export const AsFieldset = () => (
  <FormControl tag="fieldset">
    <Textarea label="Content" />
    <FormHelperText>your content</FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const Disabled = () => (
  <FormControl isDisabled tag="fieldset">
    <Textarea label="Content" />
    <FormHelperText>your content</FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const WithHelperText = () => (
  <FormControl>
    <TextInput label="Username" />
    <FormHelperText>
      your name will be how other users notice you
    </FormHelperText>
    <FormErrorMessage>
      this text will not render until isInvalid prop is true
    </FormErrorMessage>
  </FormControl>
);

export const WithErrorMessage = () => (
  <FormControl isInvalid isRequired>
    <TextInput floatLabel label="Username" />
    <FormHelperText>
      your name will be how other users notice you
    </FormHelperText>
    <FormErrorMessage>name field is required</FormErrorMessage>
  </FormControl>
);
