import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SettingsIcon, UserIcon, LogoutIcon, HalfMoonIcon } from '@atoms';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@molecules';

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
  title: 'Supernova UI/Molecules/Menu',
} as ComponentMeta<typeof Menu>;

const parameters = {
  controls: {
    include: ['arrowSize', 'closeOnEsc', 'placement', 'spacing', 'withArrow'],
  },
};

const Template: ComponentStory<typeof Menu> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
  );
};

export const Basic = Template.bind({});
Basic.parameters = parameters;

const WithGroupTemplate: ComponentStory<typeof Menu> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
  );
};

export const WithGroup = WithGroupTemplate.bind({});
WithGroup.parameters = parameters;

const WithIconsTemplate: ComponentStory<typeof Menu> = args => {
  const { closeOnEsc, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
  );
};

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.parameters = parameters;
