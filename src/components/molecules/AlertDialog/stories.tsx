import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Button } from '@atoms';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogButton,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@molecules';

import { AlertDialogProps } from './AlertDialog';

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
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: AlertDialog,
  title: 'Supernova UI/Molecules/AlertDialog',
} as Meta;

const BasicTemplate: Story<AlertDialogProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)}>Open</Button>
      </div>

      <AlertDialog
        {...args}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogHeader>Delete your account</AlertDialogHeader>
        <AlertDialogBody>Are you sure?</AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogButton
            onClick={() => setIsOpen(false)}
            ref={cancelButtonRef}
            variant="outline"
          >
            Cancel
          </AlertDialogButton>

          <AlertDialogButton
            colorVariant="error700"
            onClick={() => setIsOpen(false)}
          >
            Delete
          </AlertDialogButton>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};

const FinalFocusRefTemplate: Story<AlertDialogProps> = args => {
  const [isOpen, setOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setOpen(true)}>Open</Button>

        <Button ref={finalFocusRef} variant="outline">
          finalFocusRef
        </Button>
      </div>

      <AlertDialog
        {...args}
        finalFocusRef={finalFocusRef}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={handleClose}
      >
        <AlertDialogHeader>Delete your account</AlertDialogHeader>
        <AlertDialogBody>Are you sure?</AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogButton
            onClick={handleClose}
            ref={cancelButtonRef}
            variant="outline"
          >
            Cancel
          </AlertDialogButton>

          <AlertDialogButton colorVariant="error700" onClick={handleClose}>
            Delete
          </AlertDialogButton>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
};

export const FinalFocusRef = FinalFocusRefTemplate.bind({});
FinalFocusRef.args = {};
FinalFocusRef.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};
