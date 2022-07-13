import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Button, TextInput } from '@atoms';
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
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: Drawer,
  title: 'Supernova UI/Molecules/Drawer',
} as Meta;

const BasicTemplate: Story<DrawerProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
      </div>

      <Drawer {...args} onClose={handleClose} isOpen={isOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => setIsOpen(false)}
            margin="0 sm 0 0"
            variant="outline"
          >
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
Basic.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};

const FinalFocusRefTemplate: Story<DrawerProps> = args => {
  const [isOpen, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setOpen(true)} margin="0 sm">
          Open
        </Button>

        <Button ref={finalFocusRef} variant="outline">
          finalFocusRef
        </Button>
      </div>

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
            <TextInput
              floatLabel
              label="Email"
              margin="sm 0"
              ref={initialFocusRef}
              typeOf="email"
            />
            <TextInput
              floatLabel
              label="Password"
              margin="sm 0"
              typeOf="password"
            />
          </form>
        </DrawerBody>

        <DrawerFooter>
          <DrawerButton
            onClick={handleClose}
            margin="0 sm 0 0"
            variant="outline"
          >
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
FinalFocusRef.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};
