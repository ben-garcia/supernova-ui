import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Box, Button, Editable } from '@components';
import { useEditableControls } from '@hooks';

export default {
  args: {
    isAutoResize: true,
    isDisabled: false,
    selectAllOnFocus: true,
    submitOnBlur: true,
  },
  argTypes: {
    isAutoResize: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    selectAllOnFocus: { control: 'boolean' },
    submitOnBlur: { control: 'boolean' },
  },
  component: Editable.Root,
  title: 'Supernova UI/Form/Editable',
} as Meta<typeof Editable.Root>;

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

const Template: StoryFn<typeof Editable.Root> = args => {
  const [value, setValue] = useState('edit');
  return (
    <Box border="1px solid #ccc" padding="5px">
      <Editable.Root {...args} onChange={val => setValue(val)} value={value}>
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
    </Box>
  );
};

export const WithInput = {
  render: Template,
  parameters,
};

const WithTextareaTemplate: StoryFn<any> = args => {
  const [value, setValue] = useState('edit');
  const { isAutoResize, ...rest } = args;
  return (
    <Box border="1px solid #ccc" padding="5px">
      <Editable.Root {...rest} onChange={val => setValue(val)} value={value}>
        <Editable.Preview />
        <Editable.Textarea isAutoResize={isAutoResize} />
      </Editable.Root>
    </Box>
  );
};

export const WithTextarea = {
  render: WithTextareaTemplate,
  parameters,
};

function CustomEditableTextarea(props: { isAutoResize: boolean }) {
  const { isAutoResize } = props;
  const { isEditing, getCancelButtonProps, getSubmitButtonProps } =
    useEditableControls();

  return (
    <Box border="1px solid #ccc" padding="5px" position="relative">
      <Editable.Textarea isAutoResize={isAutoResize} />
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
      <Editable.Preview />
    </Box>
  );
}

const WithCustomTextareaTemplate: StoryFn<any> = args => {
  const [value, setValue] = useState('Add description');
  const { isAutoResize, ...rest } = args;
  return (
    <Editable.Root {...rest} onChange={val => setValue(val)} value={value}>
      <CustomEditableTextarea isAutoResize={isAutoResize} />
    </Editable.Root>
  );
};

export const WithCustomTextarea = {
  render: WithCustomTextareaTemplate,
  parameters,
};

function CustomEditableInput() {
  const { isEditing, getCancelButtonProps, getSubmitButtonProps } =
    useEditableControls();

  return (
    <Box
      border="1px solid #ccc"
      padding="5px"
      position="relative"
      display="flex"
    >
      <Editable.Input />
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
      <Editable.Preview />
    </Box>
  );
}

const WithCustomInput: StoryFn<any> = args => {
  const [value, setValue] = useState('Add description');
  return (
    <Editable.Root {...args} onChange={val => setValue(val)} value={value}>
      <CustomEditableInput />
    </Editable.Root>
  );
};

export const CustomInput = {
  render: WithCustomInput,
  parameters,
};
