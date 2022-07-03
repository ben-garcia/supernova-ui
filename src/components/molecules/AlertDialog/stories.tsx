/* eslint react/jsx-wrap-multilines: 0 */
import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import AlertDialog from '.';
import AlertDialogBody from './AlertDialogBody';
import AlertDialogButton from './AlertDialogButton';
import AlertDialogFooter from './AlertDialogFooter';
import AlertDialogHeader from './AlertDialogHeader';
import Button from '../../atoms/Button';
import argTypes from './arg-types';
import { AlertDialogProps } from './types';

export default {
  argTypes,
  component: AlertDialog,
  title: 'Supernova UI/Molecules/AlertDialog',
} as Meta;

const BasicTemplate: Story<AlertDialogProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
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
            margin="0 sm 0 0"
            ref={cancelButtonRef}
            variant="outline"
          >
            Cancel
          </AlertDialogButton>

          <AlertDialogButton
            backgroundColor="error500"
            hoverBackgroundColor="error700"
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
        <Button onClick={() => setOpen(true)} margin="0 sm">
          Open
        </Button>

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
            margin="0 sm 0 0"
            ref={cancelButtonRef}
            variant="outline"
          >
            Cancel
          </AlertDialogButton>

          <AlertDialogButton
            backgroundColor="error500"
            hoverBackgroundColor="error700"
            onClick={handleClose}
          >
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
