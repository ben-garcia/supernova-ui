import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from '@components';
import { useEditableControls } from '@hooks';

export default {
  argTypes: {
    isAutoResize: { control: 'boolean', defaultValue: true },
    isDisabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    selectAllOnFocus: { control: 'boolean', defaultValue: true },
    submitOnBlur: { control: 'boolean', defaultValue: true },
  },
  component: Editable,
  title: 'Supernova UI/Form/Editable',
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
    <Box border="1px solid #ccc" padding="5px">
      <Editable {...args} onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
};

export const WithInput = Template.bind({});
WithInput.parameters = parameters;

const WithTextareaTemplate: ComponentStory<any> = args => {
  const [value, setValue] = useState('edit');
  return (
    <Box border="1px solid #ccc" padding="5px">
      <Editable {...args} onChange={val => setValue(val)} value={value}>
        <EditablePreview />
        <EditableTextarea isAutoResize={args.isAutoResize} />
      </Editable>
    </Box>
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
    <Box border="1px solid #ccc" padding="5px" position="relative">
      <EditableTextarea isAutoResize={isAutoResize} />
      {isEditing ? (
        <Box
          display="flex"
          float="right"
          margin="10px"
          position="absolute"
          bottom={0}
          right={0}
          zIndex={9999}
        >
          <Button
            color="white"
            colorVariant="error700"
            {...getCancelButtonProps()}
          >
            Cancel
          </Button>
          <Button
            colorVariant="success500"
            color="white"
            {...getSubmitButtonProps()}
          >
            Save
          </Button>
        </Box>
      ) : null}
      <EditablePreview />
    </Box>
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
    <Box
      border="1px solid #ccc"
      padding="5px"
      position="relative"
      display="flex"
    >
      <EditableInput />
      {isEditing ? (
        <Box display="flex" margin="0 10px">
          <Button colorVariant="error700" {...getCancelButtonProps()}>
            Cancel
          </Button>

          <Button colorVariant="success500" {...getSubmitButtonProps()}>
            Save
          </Button>
        </Box>
      ) : null}
      <EditablePreview />
    </Box>
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
