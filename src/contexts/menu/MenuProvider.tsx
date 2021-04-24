import { createContext } from 'react';

import { Menu } from './types';

const initialState: Menu = {
  id: '',
  closeOnEsc: false,
  isOpen: false,
  onClose: () => {},
};

export const MenuContext = createContext<Menu>(initialState);
export const MenuProvider = MenuContext.Provider;
