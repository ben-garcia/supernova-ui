import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '@atoms';
import { useEditableControls } from '@hooks';
import {
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from '@molecules';

export default {
  argTypes: {
    isAutoResize: { control: 'boolean', defaultValue: true },
    isDisabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    selectAllOnFocus: { control: 'boolean', defaultValue: true },
    submitOnBlur: { control: 'boolean', defaultValue: true },
  },
  component: Editable,
  title: 'Supernova UI/molecules/Editable',
} as ComponentMeta<typeof Editable>;

const parameters = {
  controls: {
    include: [
      'isAutoResize',
      'isDisabled',
      'placeholder',
      'selectAllOnFocus',
      'submitOnBlur',
    ],
  },
};

const Template: ComponentStory<typeof Editable> = args => {
  const [value, setValue] = useState('edit');
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Editable {...args} onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
};

export const WithInput = Template.bind({});
WithInput.parameters = parameters;

const WithTextareaTemplate: ComponentStory<any> = args => {
  const [value, setValue] = useState('edit');
  return (
    <div style={{ border: '1px solid #ccc', padding: '5px' }}>
      <Editable {...args} onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableTextarea isAutoResize={args.isAutoResize} />
      </Editable>
    </div>
  );
};

export const WithTextarea = WithTextareaTemplate.bind({});
WithTextarea.parameters = parameters;

const CustomEditableTextarea = (props: { isAutoResize: boolean }) => {
  const { isAutoResize } = props;
  const {
    isEditing,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '5px', position: 'relative' }}
    >
      <EditableTextarea isAutoResize={isAutoResize} />
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

const WithCustomTextareaTemplate: ComponentStory<any> = args => {
  const [value, setValue] = useState('Add description');
  return (
    <Editable {...args} onChange={val => setValue(val)} value={value}>
      <CustomEditableTextarea isAutoResize={args.isAutoResize} />
    </Editable>
  );
};

export const WithCustomTextarea = WithCustomTextareaTemplate.bind({});
WithCustomTextarea.parameters = parameters;

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

const WithCustomInput: ComponentStory<typeof Editable> = args => {
  const [value, setValue] = useState('Add description');
  return (
    <Editable {...args} onChange={val => setValue(val)} value={value}>
      <CustomEditableInput />
    </Editable>
  );
};

export const CustomInput = WithCustomInput.bind({});
CustomInput.parameters = parameters;
