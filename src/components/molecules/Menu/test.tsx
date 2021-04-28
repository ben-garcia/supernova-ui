/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import Menu from '.';
import { MenuProps } from './types';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import MenuList from './MenuList';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
} from '../../../test-utils';

describe('<Menu />', () => {
  beforeAll(() => mockMatchMedia());

  const MenuTest = (props: Omit<MenuProps, 'children'>) => {
    return (
      <Menu {...props}>
        <MenuButton data-testid="menu-button">open</MenuButton>
        <MenuList data-testid="menu-list">
          <MenuGroup title="main">
            <MenuItem data-testid="profile">Profile</MenuItem>
            <MenuItem data-testid="settings">Settings</MenuItem>
          </MenuGroup>
          <MenuGroup title="secondary">
            <MenuItem data-testid="nightmode">Night Mode</MenuItem>
            <MenuItem data-testid="signout">Signout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<MenuTest isOpen onClose={() => {}} />);
  });

  it('should render with correct aria attributes', () => {
    const { rerender, getByTestId } = render(
      <MenuTest isOpen={false} onClose={() => {}} />
    );
    const button = getByTestId('menu-button');
    const menuList = getByTestId('menu-list');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute(
      'aria-controls',
      menuList.getAttribute('id')
    );

    rerender(<MenuTest isOpen onClose={() => {}} />);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render menu items with correct role', () => {
    const { getByTestId } = render(<MenuTest isOpen onClose={() => {}} />);
    const menuItemProfile = getByTestId('profile');

    expect(menuItemProfile).toHaveAttribute('role', 'menuitem');
  });

  it('should render menu list inside a portal', () => {
    const { getByTestId } = render(<MenuTest isOpen onClose={() => {}} />);
    const menuList = getByTestId('menu-list');
    const portal = menuList.parentElement;
    const menuId = menuList?.getAttribute('id')?.replace('-list', '');

    expect(portal?.getAttribute('id')).toBe(`${menuId}-portal`);
  });

  it.skip('should focus the first menu item', () => {
    const Test = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <MenuButton data-testid="menu-button" onClick={() => setIsOpen(true)}>
            Open
          </MenuButton>
          <MenuButton data-testid="test-menu-button">open</MenuButton>
          <MenuList data-testid="test-list">
            <MenuGroup title="main">
              <MenuItem data-testid="test-profile">Profile</MenuItem>
              <MenuItem data-testid="test-settings">Settings</MenuItem>
            </MenuGroup>
            <MenuGroup title="secondary">
              <MenuItem data-testid="test-nightmode">Night Mode</MenuItem>
              <MenuItem data-testid="test-signout">Signout</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      );
    };

    const { getByTestId } = render(<Test />);
    const button = getByTestId('test-menu-button');

    fireEvent.click(button);

    const profileItem = getByTestId('test-profile');

    // modal input should be focused
    expect(profileItem).toHaveFocus();
  });
});
