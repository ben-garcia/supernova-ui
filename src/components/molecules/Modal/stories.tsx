import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Box, Button, TextInput } from '@atoms';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@molecules';

import { ModalProps } from './Modal';

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
  component: Modal,
  title: 'Supernova UI/Molecules/Modal',
} as Meta;

const BasicTemplate: Story<ModalProps> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};

const FinalFocusRefTemplate: Story<ModalProps> = args => {
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

export const FinalFocusRef = FinalFocusRefTemplate.bind({});
FinalFocusRef.args = {};
FinalFocusRef.parameters = {
  controls: { include: ['closeOnEsc', 'closeOnOverlayClick', 'size'] },
};
