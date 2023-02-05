import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Box, Button, TextInput } from '@atoms';
import {
  Drawer,
  DrawerBody,
  DrawerButton,
  DrawerFooter,
  DrawerHeader,
} from '@molecules';

import { DrawerProps } from './Drawer';

export default {
  argTypes: {
    closeOnEsc: {
      control: 'boolean',
      defaultValue: true,
    },
    closeOnOverlayClick: {
      control: 'boolean',
      defaultValue: true,
    },
    placement: {
      control: 'select',
      defaultValue: 'left',
      options: ['bottom', 'left', 'right', 'top'],
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: Drawer,
  title: 'Supernova UI/Molecules/Drawer',
} as Meta;

const parameters = {
  controls: {
    include: ['closeOnEsc', 'closeOnOverlayClick', 'placement', 'size'],
  },
};

const BasicTemplate: Story<DrawerProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Box>
        <Button onClick={() => setIsOpen(true)}>Trigger Drawer</Button>
      </Box>

      <Drawer {...args} onClose={handleClose} isOpen={isOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </DrawerButton>

          <DrawerButton onClick={() => setIsOpen(false)}>Save</DrawerButton>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.parameters = parameters;

const FinalFocusRefTemplate: Story<DrawerProps> = args => {
  const [isOpen, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box display="flex">
        <Button onClick={() => setOpen(true)}>Open</Button>

        <Button ref={finalFocusRef} variant="outline">
          finalFocusRef
        </Button>
      </Box>

      <Drawer
        {...args}
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <DrawerHeader>Create an account</DrawerHeader>

        <DrawerBody>
          <form>
            <TextInput label="Email" ref={initialFocusRef} type="email" />
            <TextInput label="Password" type="password" />
          </form>
        </DrawerBody>

        <DrawerFooter>
          <DrawerButton onClick={handleClose} variant="outline">
            Cancel
          </DrawerButton>

          <DrawerButton onClick={handleClose}>Signup</DrawerButton>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const FinalFocusRef = FinalFocusRefTemplate.bind({});
FinalFocusRef.args = {};
FinalFocusRef.parameters = parameters;
