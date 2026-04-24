import { createContext } from 'react';

import { DrawerContextProps } from './types';

const initialState: DrawerContextProps = {
  getDrawerBodyProps: (props = {}) => ({ ...props }),
  getDrawerHeaderProps: (props = {}) => ({ ...props }),
  getDrawerFooterProps: (props = {}) => ({ ...props }),
  isOpen: false,
  onClose: () => {},
};

export const DrawerContext = createContext<DrawerContextProps>(initialState);
export const DrawerProvider = DrawerContext.Provider;
