import { Meta, StoryFn } from '@storybook/react';
import React, { useRef, useState } from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerButton,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  TextInput,
} from '@components';
import { DrawerProps } from '@components/Drawer/Drawer';

export default {
  args: {
    closeOnEsc: true,
    closeOnOverlayClick: true,
    placement: 'left',
    size: 'md',
  },
  argTypes: {
    closeOnEsc: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: ['bottom', 'left', 'right', 'top'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: Drawer,
  title: 'Supernova UI/Overlay/Drawer',
} as Meta;

const parameters = {
  controls: {
    include: ['closeOnEsc', 'closeOnOverlayClick', 'placement', 'size'],
  },
};

const BasicTemplate: StoryFn<DrawerProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Box>
        <Button onClick={() => setIsOpen(true)}>Trigger Drawer</Button>
      </Box>

      <Drawer {...args} onClose={handleClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>This is a drawer</DrawerBody>
          <DrawerFooter>
            <DrawerButton onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </DrawerButton>
            <DrawerButton onClick={() => setIsOpen(false)}>Save</DrawerButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
  parameters,
};

const FinalFocusRefTemplate: StoryFn<DrawerProps> = args => {
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
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>Create an account</DrawerHeader>
          <DrawerCloseButton />
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
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const FinalFocusRef = {
  render: FinalFocusRefTemplate,
  args: {},
  parameters,
};
