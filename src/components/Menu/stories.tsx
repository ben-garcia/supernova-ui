import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import {
  Box,
  HalfMoonIcon,
  LogoutIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  SettingsIcon,
  UserIcon,
} from '@components';

export default {
  argTypes: {
    arrowSize: { control: { type: 'number' }, defaultValue: 15 },
    closeOnEsc: { control: 'boolean', defaultValue: true },
    placement: {
      control: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end'],
    },
    spacing: { control: { type: 'number' }, defaultValue: 5 },
    withArrow: { control: 'boolean', defaultValue: false },
  },
  component: Menu,
  title: 'Supernova UI/Overlay/Menu',
} as Meta<typeof Menu>;

const parameters = {
  controls: {
    include: ['arrowSize', 'closeOnEsc', 'placement', 'spacing', 'withArrow'],
  },
};

const Template: StoryFn<typeof Menu> = args => {
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
      <Menu
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton onClick={() => setIsOpen(true)}>Trigger Menu</MenuButton>
        <MenuList {...rest}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Night Mode</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export const Basic = {
  render: Template,
  parameters,
};

const WithGroupTemplate: StoryFn<typeof Menu> = args => {
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
      <Menu
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton onClick={() => setIsOpen(true)}>menu</MenuButton>
        <MenuList {...rest}>
          <MenuGroup title="My Stuff">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
          </MenuGroup>
          <MenuGroup title="Other">
            <MenuItem>Night Mode</MenuItem>
            <MenuItem>Sign Out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export const WithGroup = {
  render: WithGroupTemplate,
  parameters,
};

const WithIconsTemplate: StoryFn<typeof Menu> = args => {
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
      <Menu
        closeOnEsc={closeOnEsc}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton onClick={() => setIsOpen(true)}>menu</MenuButton>
        <MenuList {...rest}>
          <MenuGroup title="My Stuff">
            <MenuItem>
              <UserIcon margin="0 10px 0 0" size="xs" />
              Profile
            </MenuItem>
            <MenuItem>
              <SettingsIcon margin="0 10px 0 0" size="xs" />
              Settings
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="Other">
            <MenuItem>
              <HalfMoonIcon margin="0 10px 0 0" size="xs" />
              Night Mode
            </MenuItem>
            <MenuItem>
              <LogoutIcon margin="0 10px 0 0" size="xs" />
              Sign Out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export const WithIcons = {
  render: WithIconsTemplate,
  parameters,
};
