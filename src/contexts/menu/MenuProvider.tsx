import { createContext } from 'react';

import { Menu } from './types';

const initialState: Menu = {
  focusedIndex: -1,
  closeOnEsc: false,
  isOpen: false,
  onClose: () => {},
  getMenuItemProps: () => {},
  getMenuListProps: () => {},
  getMenuButtonProps: () => {},
  menuListRef: null,
  menuButtonRef: null,
  menuId: '',
  setFocusedIndex: () => {},
};

export const MenuContext = createContext<Menu>(initialState);
export const MenuProvider = MenuContext.Provider;
