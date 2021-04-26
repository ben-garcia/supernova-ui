import { createContext } from 'react';

import { Menu } from './types';

const initialState: Menu = {
  activeMenuItem: null,
  changeActiveMenuItem: () => {},
  id: '',
  closeOnEsc: false,
  isOpen: false,
  onClose: () => {},
  getMenuItemProps: () => {},
  getMenuListProps: () => {},
  getMenuButtonProps: () => {},
  menuListRef: null,
  menuButtonRef: null,
};

export const MenuContext = createContext<Menu>(initialState);
export const MenuProvider = MenuContext.Provider;
