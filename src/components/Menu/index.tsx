import { FC, ForwardRefExoticComponent, PropsWithChildren } from 'react';

import MenuRoot from './MenuRoot';
import { MenuRootProps } from './types';
import MenuButton, { MenuButtonProps } from './MenuButton';
import MenuGroup, { MenuGroupProps } from './MenuGroup';
import MenuItem, { MenuItemProps } from './MenuItem';
import MenuList, { MenuListProps } from './MenuList';

interface MenuComponent {
  /**
   * The container for all Menu related components
   * that provides context to its children.
   */
  Root: FC<PropsWithChildren<MenuRootProps>>;
  /**
   * The trigger for the Menu component.
   */
  Button: FC<MenuButtonProps>;
  /**
   * Wrapper to group relatved menu items.
   */
  Group: FC<PropsWithChildren<MenuGroupProps>>;
  /**
   * Menu option to select from.
   */
  Item: ForwardRefExoticComponent<MenuItemProps>;
  /**
   * Wrapper for all menu items.
   */
  List: ForwardRefExoticComponent<MenuListProps>;
}

const Menu: MenuComponent = {
  Root: MenuRoot,
  Button: MenuButton,
  Group: MenuGroup,
  Item: MenuItem,
  List: MenuList,
};

export default Menu;
