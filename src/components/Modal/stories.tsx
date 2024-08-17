import { Meta, StoryFn } from '@storybook/react';
import React, { useRef, useState } from 'react';

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TextInput,
} from '@components';
import { ModalProps } from '@components/Modal/Modal';

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
  component: Modal,
  title: 'Supernova UI/Overlay/Modal',
} as Meta;

const BasicTemplate: StoryFn<ModalProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Box>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Trigger Modal
        </Button>
      </Box>

      <Modal {...args} onClose={handleClose} isOpen={isOpen}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>

          <ModalCloseButton />

          <ModalBody>This is a modal</ModalBody>

          <ModalFooter>
            <ModalButton onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </ModalButton>
            <ModalButton onClick={() => setIsOpen(false)}>Save</ModalButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

const FinalFocusRefTemplate: StoryFn<ModalProps> = args => {
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
      <Modal
        {...args}
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <form>
              <TextInput label="Email" ref={initialFocusRef} type="email" />
              <TextInput label="Password" type="password" />
            </form>
          </ModalBody>

          <ModalFooter>
            <ModalButton onClick={handleClose} variant="outline">
              Cancel
            </ModalButton>
            <ModalButton onClick={handleClose}>Signup</ModalButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
