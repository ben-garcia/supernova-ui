import { createContext } from 'react';

import { DrawerContextProps } from './types';

const initialState: DrawerContextProps = {
  getDrawerBodyProps: () => {},
  getDrawerHeaderProps: () => {},
  getDrawerFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const DrawerContext = createContext<DrawerContextProps>(initialState);
export const DrawerProvider = DrawerContext.Provider;
