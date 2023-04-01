import { Meta, Story } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Box, Button, TextInput } from '@atoms';
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@molecules';

import { PopoverProps } from './Popover';

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
      'spacing',
      'withArrow',
    ],
  },
};

export default {
  argTypes: {
    arrowSize: { control: { type: 'number' }, defaultValue: 15 },
    closeOnEsc: {
      control: 'boolean',
      defaultValue: true,
    },
    closeOnBlur: {
      control: 'boolean',
      defaultValue: true,
    },
    placement: {
      control: 'select',
      defaultValue: 'bottom',
      options: placementOptions,
    },
    spacing: { control: { type: 'number' }, defaultValue: 5 },
    withArrow: { control: 'boolean', defaultValue: true },
  },
  component: Popover,
  title: 'Supernova UI/Molecules/Popover',
} as Meta;

const BasicTemplate: Story<PopoverProps> = args => {
  const { closeOnBlur, closeOnEsc, ...rest } = args;
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

export const Basic = BasicTemplate.bind({});
Basic.args = {};
Basic.parameters = parameters;

const FinalFocusRefTemplate: Story<PopoverProps> = args => {
  const { closeOnBlur, closeOnEsc, ...rest } = args;
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
        trapFocus
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

export const FinalFocusRef = FinalFocusRefTemplate.bind({});
FinalFocusRef.args = {};
FinalFocusRef.parameters = parameters;

const ReferenceTemplate: Story<PopoverProps> = args => {
  const { closeOnBlur, closeOnEsc, ...rest } = args;
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

export const Reference = ReferenceTemplate.bind({});
Reference.args = {};
Reference.parameters = parameters;
