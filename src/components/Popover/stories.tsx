import { Meta, StoryFn } from '@storybook/react';
import React, { useRef, useState } from 'react';

import {
  Box,
  Button,
  TextInput,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@components';
import { PopoverProps } from '@components/Popover/Popover';

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
  component: Popover,
  title: 'Supernova UI/Overlay/Popover',
} as Meta;

const BasicTemplate: StoryFn<PopoverProps> = args => {
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
      <Popover
        closeOnBlur={closeOnBlur}
        closeOnEsc={closeOnEsc}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        shouldReturnFocusOnClose={shouldReturnFocusOnClose}
        trapFocus={trapFocus}
      >
        <PopoverTrigger>
          <Button>Trigger Popover</Button>
        </PopoverTrigger>
        <PopoverContent {...rest}>
          <PopoverHeader>Popover Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>This is a popover</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
  parameters,
};

const FinalFocusRefTemplate: StoryFn<PopoverProps> = args => {
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
      <Popover
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
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>

        <PopoverContent {...rest}>
          <PopoverHeader>Create an account</PopoverHeader>

          <PopoverCloseButton />

          <PopoverBody>
            <form>
              <TextInput label="Email" ref={initialFocusRef} type="email" />
              <TextInput label="Password" type="password" />
            </form>
          </PopoverBody>

          <PopoverFooter>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={onClose}>Signup</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export const FinalFocusRef = {
  render: FinalFocusRefTemplate,
  args: {},
  parameters,
};

const ReferenceTemplate: StoryFn<PopoverProps> = args => {
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
      <Popover
        closeOnBlur={closeOnBlur}
        closeOnEsc={closeOnEsc}
        onClose={onClose}
        isOpen={isOpen}
        shouldReturnFocusOnClose={false}
        trapFocus={trapFocus}
      >
        <PopoverTrigger>
          <Button>Reference</Button>
        </PopoverTrigger>
        <PopoverContent {...rest}>
          <PopoverHeader>Popover Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>This is a popover</PopoverBody>
        </PopoverContent>
      </Popover>
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
