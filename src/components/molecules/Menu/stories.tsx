import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SettingsIcon, UserIcon, LogoutIcon, HalfMoonIcon } from '@atoms/index';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '.';

export default {
  argTypes: {
    closeOnEsc: { control: 'boolean', defaultValue: true },
  },
  component: Menu,
  title: 'Supernova UI/Molecules/Menu',
} as ComponentMeta<typeof Menu>;

const parameters = {
  controls: { include: ['closeOnEsc'] },
};

const Template: ComponentStory<typeof Menu> = args => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

export const Basic = Template.bind({});
Basic.parameters = parameters;

const WithGroupTemplate: ComponentStory<typeof Menu> = args => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

export const WithGroup = WithGroupTemplate.bind({});
WithGroup.parameters = parameters;

const WithIconsTemplate: ComponentStory<typeof Menu> = args => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Menu {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
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

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.parameters = parameters;
