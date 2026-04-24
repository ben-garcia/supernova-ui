import { createContext } from 'react';

import { Menu } from './types';

export const MenuContext = createContext<Menu | undefined>(undefined);
export const MenuProvider = MenuContext.Provider;
