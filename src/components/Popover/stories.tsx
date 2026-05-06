import { Meta, StoryFn } from '@storybook/react-webpack5';
import React, { useRef, useState } from 'react';

import { Box, Button, TextInput, Popover } from '@components';
import { PopoverRootProps } from '@components/Popover/PopoverRoot';

const placementOptions = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];
const parameters = {
  controls: {
    include: [
      'arrowSize',
      'closeOnBlur',
      'closeOnEsc',
      'placement',
      'shouldReturnFocusOnClose',
      'spacing',
      'withArrow',
      'trapFocus',
    ],
  },
};

export default {
  args: {
    arrowSize: 15,
    closeOnEsc: true,
    closeOnBlur: true,
    placement: 'bottom',
    shouldReturnFocusOnClose: true,
    spacing: 5,
    trapFocus: false,
    withArrow: true,
  },
  argTypes: {
    arrowSize: { control: { type: 'number' } },
    closeOnEsc: {
      control: 'boolean',
    },
    closeOnBlur: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: placementOptions,
    },
    shouldReturnFocusOnClose: { control: 'boolean' },
    spacing: { control: { type: 'number' } },
    trapFocus: { control: 'boolean' },
    withArrow: { control: 'boolean' },
  },
  component: Popover.Root,
  title: 'Supernova UI/Overlay/Popover',
} as Meta<typeof Popover.Root>;

const BasicTemplate: StoryFn<PopoverRootProps> = args => {
  const {
    closeOnBlur,
    closeOnEsc,
    shouldReturnFocusOnClose,
    trapFocus,
    ...rest
  } = args;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);
  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Popover.Root
        closeOnBlur={closeOnBlur}
        closeOnEsc={closeOnEsc}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        shouldReturnFocusOnClose={shouldReturnFocusOnClose}
        trapFocus={trapFocus}
      >
        <Popover.Trigger>
          <Button>Trigger Popover</Button>
        </Popover.Trigger>
        <Popover.Content {...rest}>
          <Popover.Header>Popover Header</Popover.Header>
          <Popover.CloseButton />
          <Popover.Body>This is a popover</Popover.Body>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
  parameters,
};

const FinalFocusRefTemplate: StoryFn<PopoverRootProps> = args => {
  const {
    closeOnBlur,
    closeOnEsc,
    shouldReturnFocusOnClose,
    trapFocus,
    ...rest
  } = args;
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Button ref={finalFocusRef} variant="outline">
        finalFocusRef
      </Button>
      <Popover.Root
        closeOnBlur={closeOnBlur}
        closeOnEsc={closeOnEsc}
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        shouldReturnFocusOnClose={shouldReturnFocusOnClose}
        trapFocus={trapFocus}
      >
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>

        <Popover.Content {...rest}>
          <Popover.Header>Create an account</Popover.Header>

          <Popover.CloseButton />

          <Popover.Body>
            <form>
              <TextInput label="Email" ref={initialFocusRef} />
              <TextInput label="Password" type="password" />
            </form>
          </Popover.Body>

          <Popover.Footer>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={onClose}>Signup</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export const FinalFocusRef = {
  render: FinalFocusRefTemplate,
  args: {},
  parameters,
};

const ReferenceTemplate: StoryFn<PopoverRootProps> = args => {
  const { closeOnBlur, closeOnEsc, trapFocus, ...rest } = args;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);
  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap="10px"
      width="100vw"
      height="100vh"
    >
      <Button colorVariant="cyan400" onClick={onToggle}>
        Trigger
      </Button>
      <Popover.Root
        closeOnBlur={closeOnBlur}
        closeOnEsc={closeOnEsc}
        onClose={onClose}
        isOpen={isOpen}
        shouldReturnFocusOnClose={false}
        trapFocus={trapFocus}
      >
        <Popover.Trigger>
          <Button>Reference</Button>
        </Popover.Trigger>
        <Popover.Content {...rest}>
          <Popover.Header>Popover Header</Popover.Header>
          <Popover.CloseButton />
          <Popover.Body>This is a popover</Popover.Body>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export const Reference = {
  render: ReferenceTemplate,
  args: {},

  parameters: {
    controls: {
      include: [
        'arrowSize',
        'closeOnBlur',
        'closeOnEsc',
        'placement',
        'spacing',
        'withArrow',
        'trapFocus',
      ],
    },
  },
};
