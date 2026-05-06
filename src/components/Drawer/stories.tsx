import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, Drawer, TextInput } from '@components';
import { DrawerRootProps } from '@components/Drawer/DrawerRoot';

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
  component: Drawer.Root,
  title: 'Supernova UI/Overlay/Drawer',
} as Meta<typeof Drawer.Root>;

const parameters = {
  controls: {
    include: ['closeOnEsc', 'closeOnOverlayClick', 'placement', 'size'],
  },
};

const BasicTemplate: StoryFn<DrawerRootProps> = args => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Box>
        <Button onClick={() => setIsOpen(true)}>Trigger Drawer</Button>
      </Box>

      <Drawer.Root {...args} onClose={handleClose} isOpen={isOpen}>
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>Drawer Title</Drawer.Header>
          <Drawer.CloseButton />
          <Drawer.Body>This is a drawer</Drawer.Body>
          <Drawer.Footer>
            <Drawer.Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Drawer.Button>
            <Drawer.Button onClick={() => setIsOpen(false)}>Save</Drawer.Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
  parameters,
};

const FinalFocusRefTemplate: StoryFn<DrawerRootProps> = args => {
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

      <Drawer.Root
        {...args}
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>Create an account</Drawer.Header>
          <Drawer.CloseButton />
          <Drawer.Body>
            <form>
              <TextInput label="Username" ref={initialFocusRef} />
              <TextInput label="Password" type="password" />
            </form>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Button onClick={handleClose} variant="outline">
              Cancel
            </Drawer.Button>

            <Drawer.Button onClick={handleClose}>Signup</Drawer.Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export const FinalFocusRef = {
  render: FinalFocusRefTemplate,
  args: {},
  parameters,
};
