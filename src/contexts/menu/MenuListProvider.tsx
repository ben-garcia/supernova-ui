import { createContext } from 'react';

import { MenuList } from './types';

const initialState: MenuList = {
  menuButtonItemsRef: null,  
  menuItemsContent: {},
};

export const MenuListContext = createContext<MenuList>(initialState);
export const MenuListProvider = MenuListContext.Provider;
