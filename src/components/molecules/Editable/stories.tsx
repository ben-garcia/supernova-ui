import { Meta, Story } from '@storybook/react';
import React from 'react';

import { useEditableControls } from '../../../hooks/use-editable';
import Editable from '.';
import EditablePreview from './EditablePreview';
import EditableInput from './EditableInput';
import EditableTextarea from './EditableTextarea';
import argTypes from './arg-types';
import EditableProps from './types';
import Button from '../../atoms/Button';

export default {
  argTypes,
  component: Editable,
  title: 'Supernova UI/molecules/Editable',
} as Meta;

const InputTemplate: Story<EditableProps> = args => (
  <div style={{ border: '1px solid #ccc', padding: '5px' }}>
    <Editable {...args}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </div>
);
const TextareaTemplate: Story<EditableProps> = args => (
  <div style={{ border: '1px solid #ccc', padding: '5px' }}>
    <Editable {...args}>
      <EditablePreview />
      <EditableTextarea />
    </Editable>
  </div>
);
const CustomEditableTextarea = () => {
  const {
    isEditing,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '5px', position: 'relative' }}
    >
      <EditableTextarea />
      {isEditing ? (
        <div
          style={{
            display: 'inline-block',
            float: 'right',
            margin: '10px',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <Button
            backgroundColor="error500"
            color="white"
            hoverBackgroundColor="error700"
            {...getCancelButtonProps()}
          >
            Cancel
          </Button>
          <Button
            backgroundColor="success500"
            color="white"
            hoverBackgroundColor="success700"
            {...getSubmitButtonProps()}
          >
            Save
          </Button>
        </div>
      ) : null}
      <EditablePreview />
    </div>
  );
};
const CustomTextareaTemplate: Story<EditableProps> = args => (
  <Editable {...args}>
    <CustomEditableTextarea />
  </Editable>
);

const CustomEditableInput = () => {
  const {
    isEditing,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '5px',
        position: 'relative',
        display: 'flex',
      }}
    >
      <EditableInput />
      {isEditing ? (
        <div style={{ display: 'flex', margin: '0 10px' }}>
          <Button
            backgroundColor="error500"
            color="white"
            hoverBackgroundColor="error700"
            margin="0 sm"
            {...getCancelButtonProps()}
          >
            Cancel
          </Button>
          <Button
            backgroundColor="success500"
            color="white"
            hoverBackgroundColor="success700"
            {...getSubmitButtonProps()}
          >
            Save
          </Button>
        </div>
      ) : null}
      <EditablePreview />
    </div>
  );
};

const CustomInputTemplate: Story<EditableProps> = args => (
  <Editable {...args}>
    <CustomEditableInput />
  </Editable>
);

export const Input = InputTemplate.bind({});

Input.args = {
  defaultValue: 'edit text',
};

export const Textarea = TextareaTemplate.bind({});

Textarea.args = {
  defaultValue: 'edit text',
};

export const CustomInput = CustomInputTemplate.bind({});

CustomInput.args = {
  defaultValue: 'Add description',
};

export const CustomTextarea = CustomTextareaTemplate.bind({});

CustomTextarea.args = {
  defaultValue: 'Add description',
};
