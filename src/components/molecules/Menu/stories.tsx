import { Meta } from '@storybook/react';
import React from 'react';

import { SettingsIcon, UserIcon, LogoutIcon, HalfMoonIcon } from '@atoms/index';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '.';

export default {
  component: Menu,
  title: 'Supernova UI/Molecules/Menu',
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton onClick={() => setIsOpen(true)}>menu</MenuButton>
      <MenuList width="250px">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Night Mode</MenuItem>
        <MenuItem>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const PositionRight = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton onClick={() => setIsOpen(true)}>menu</MenuButton>
        <MenuList width="200px">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Night Mode</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export const WithGroup = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton onClick={() => setIsOpen(true)}>menu</MenuButton>
      <MenuList width="250px">
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
  );
};

export const WithIcons = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton onClick={() => setIsOpen(true)}>icons</MenuButton>
      <MenuList width="250px">
        <MenuGroup title="My Stuff">
          <MenuItem>
            <UserIcon margin="0 10px 0 0" size="15px" />
            Profile
          </MenuItem>
          <MenuItem>
            <SettingsIcon margin="0 10px 0 0" size="15px" />
            Settings
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Other">
          <MenuItem>
            <HalfMoonIcon margin="0 10px 0 0" size="15px" />
            Night Mode
          </MenuItem>
          <MenuItem>
            <LogoutIcon margin="0 10px 0 0" size="15px" />
            Sign Out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
