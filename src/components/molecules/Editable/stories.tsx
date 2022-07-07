import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { useEditableControls } from '@hooks/index';
import { Button } from '@atoms/index';
import { Editable, EditablePreview, EditableInput, EditableTextarea } from '.';
import argTypes from './arg-types';

export default {
  argTypes,
  component: Editable,
  title: 'Supernova UI/molecules/Editable',
} as Meta;

export const Input = () => {
  const [value, setValue] = useState('edit');
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Editable onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
};
export const Textarea = () => {
  const [value, setValue] = useState('edit');
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Editable onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableTextarea />
      </Editable>
    </div>
  );
};
export const IsAutoResizeTextarea = () => {
  const [value, setValue] = useState('edit');
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Editable onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableTextarea isAutoResize maxLength={500} rows={1} />
      </Editable>
    </div>
  );
};
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
export const CustomTextarea = () => {
  const [value, setValue] = useState('Add description');
  return (
    <Editable onChange={val => setValue(val)} value={value}>
      <CustomEditableTextarea />
    </Editable>
  );
};

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

export const CustomInput = () => {
  const [value, setValue] = useState('Add description');
  return (
    <Editable onChange={val => setValue(val)} value={value}>
      <CustomEditableInput />
    </Editable>
  );
};
