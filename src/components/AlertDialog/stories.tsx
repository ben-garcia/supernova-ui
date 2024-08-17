import { Meta, StoryFn } from '@storybook/react';
import React, { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogButton,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@components';

import { AlertDialogProps } from '@components/AlertDialog/AlertDialog';

export default {
  args: {
    closeOnEsc: true,
    closeOnOverlayClick: true,
    size: 'md',
  },
  argTypes: {
    closeOnEsc: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  component: AlertDialog,
  title: 'Supernova UI/Overlay/AlertDialog',
} as Meta;

const BasicTemplate: StoryFn<AlertDialogProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)}>Trigger AlertDialog</Button>
      </div>

      <AlertDialog
        {...args}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete your account</AlertDialogHeader>

          <AlertDialogCloseButton />

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
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},

  parameters: {
    controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
  },
};

const FinalFocusRefTemplate: StoryFn<AlertDialogProps> = args => {
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
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete your account</AlertDialogHeader>

          <AlertDialogCloseButton />

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
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const FinalFocusRef = {
  render: FinalFocusRefTemplate,
  args: {},

  parameters: {
    controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
  },
};
