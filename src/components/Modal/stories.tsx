import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, Modal, TextInput } from '@components';
import { ModalRootProps } from '@components/Modal/ModalRoot';

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
  component: Modal.Root,
  title: 'Supernova UI/Overlay/Modal',
} as Meta<typeof Modal.Root>;

const BasicTemplate: StoryFn<ModalRootProps> = args => {
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

      <Modal.Root {...args} onClose={handleClose} isOpen={isOpen}>
        <Modal.Overlay />

        <Modal.Content>
          <Modal.Header>Modal Title</Modal.Header>

          <Modal.CloseButton />

          <Modal.Body>This is a modal</Modal.Body>

          <Modal.Footer>
            <Modal.Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Modal.Button>
            <Modal.Button onClick={() => setIsOpen(false)}>Save</Modal.Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
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

const FinalFocusRefTemplate: StoryFn<ModalRootProps> = args => {
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
      <Modal.Root
        {...args}
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <Modal.Overlay />

        <Modal.Content>
          <Modal.Header>Create an account</Modal.Header>

          <Modal.CloseButton />

          <Modal.Body>
            <form>
              <TextInput label="Username" ref={initialFocusRef} />
              <TextInput label="Password" type="password" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Button onClick={handleClose} variant="outline">
              Cancel
            </Modal.Button>
            <Modal.Button onClick={handleClose}>Signup</Modal.Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
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
