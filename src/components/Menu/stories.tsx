import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import {
  Box,
  HalfMoonIcon,
  LogoutIcon,
  Menu,
  SettingsIcon,
  UserIcon,
} from '@components';

export default {
  args: {
    arrowSize: 15,
    closeOnEsc: true,
    placement: 'start',
    spacing: 5,
    withArrow: false,
  },
  argTypes: {
    arrowSize: { control: { type: 'number' } },
    closeOnEsc: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    spacing: { control: { type: 'number' } },
    withArrow: { control: 'boolean' },
  },
  component: Menu.Root,
  title: 'Supernova UI/Overlay/Menu',
} as Meta<typeof Menu.Root>;

const parameters = {
  controls: {
    include: ['arrowSize', 'closeOnEsc', 'placement', 'spacing', 'withArrow'],
  },
};

const Template: StoryFn<typeof Menu.Root> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Menu.Root
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Menu.Button onClick={() => setIsOpen(true)}>Trigger Menu</Menu.Button>
        <Menu.List {...rest}>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item>Night Mode</Menu.Item>
          <Menu.Item>Sign Out</Menu.Item>
        </Menu.List>
      </Menu.Root>
    </Box>
  );
};

export const Basic = {
  render: Template,
  parameters,
};

const WithGroupTemplate: StoryFn<typeof Menu.Root> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Menu.Root
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Menu.Button onClick={() => setIsOpen(true)}>menu</Menu.Button>
        <Menu.List {...rest}>
          <Menu.Group title="My Stuff">
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
          </Menu.Group>
          <Menu.Group title="Other">
            <Menu.Item>Night Mode</Menu.Item>
            <Menu.Item>Sign Out</Menu.Item>
          </Menu.Group>
        </Menu.List>
      </Menu.Root>
    </Box>
  );
};

export const WithGroup = {
  render: WithGroupTemplate,
  parameters,
};

const WithIconsTemplate: StoryFn<typeof Menu.Root> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Menu.Root
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Menu.Button onClick={() => setIsOpen(true)}>menu</Menu.Button>
        <Menu.List {...rest}>
          <Menu.Group title="My Stuff">
            <Menu.Item>
              <UserIcon margin="0 10px 0 0" size="xs" />
              Profile
            </Menu.Item>
            <Menu.Item>
              <SettingsIcon margin="0 10px 0 0" size="xs" />
              Settings
            </Menu.Item>
          </Menu.Group>
          <Menu.Group title="Other">
            <Menu.Item>
              <HalfMoonIcon margin="0 10px 0 0" size="xs" />
              Night Mode
            </Menu.Item>
            <Menu.Item>
              <LogoutIcon margin="0 10px 0 0" size="xs" />
              Sign Out
            </Menu.Item>
          </Menu.Group>
        </Menu.List>
      </Menu.Root>
    </Box>
  );
};

export const WithIcons = {
  render: WithIconsTemplate,
  parameters,
};
