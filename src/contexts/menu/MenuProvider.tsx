import { createContext } from 'react';

import { Menu } from './types';

const initialState: Menu = {
  focusedIndex: -1,
  id: '',
  closeOnEsc: false,
  isOpen: false,
  onClose: () => {},
  getMenuItemProps: () => {},
  getMenuListProps: () => {},
  getMenuButtonProps: () => {},
  menuListRef: null,
  menuButtonRef: null,
  setFocusedIndex: () => {},
};

export const MenuContext = createContext<Menu>(initialState);
export const MenuProvider = MenuContext.Provider;
