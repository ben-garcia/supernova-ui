import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { AlertDialog, Button } from '@components';

import { AlertDialogRootProps } from '@components/AlertDialog/AlertDialogRoot';

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
  component: AlertDialog.Root,
  title: 'Supernova UI/Overlay/AlertDialog',
} as Meta<typeof AlertDialog.Root>;

const BasicTemplate: StoryFn<AlertDialogRootProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)}>Trigger AlertDialog</Button>
      </div>

      <AlertDialog.Root
        {...args}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>Delete your account</AlertDialog.Header>

          <AlertDialog.CloseButton />

          <AlertDialog.Body>Are you sure?</AlertDialog.Body>

          <AlertDialog.Footer>
            <AlertDialog.Button
              onClick={() => setIsOpen(false)}
              ref={cancelButtonRef}
              variant="outline"
            >
              Cancel
            </AlertDialog.Button>

            <AlertDialog.Button
              colorVariant="error700"
              onClick={() => setIsOpen(false)}
            >
              Delete
            </AlertDialog.Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
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

const FinalFocusRefTemplate: StoryFn<AlertDialogRootProps> = args => {
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

      <AlertDialog.Root
        {...args}
        finalFocusRef={finalFocusRef}
        isOpen={isOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={handleClose}
      >
        <AlertDialog.Overlay />

        <AlertDialog.Content>
          <AlertDialog.Header>Delete your account</AlertDialog.Header>

          <AlertDialog.CloseButton />

          <AlertDialog.Body>Are you sure?</AlertDialog.Body>

          <AlertDialog.Footer>
            <AlertDialog.Button
              onClick={handleClose}
              ref={cancelButtonRef}
              variant="outline"
            >
              Cancel
            </AlertDialog.Button>

            <AlertDialog.Button colorVariant="error700" onClick={handleClose}>
              Delete
            </AlertDialog.Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
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
