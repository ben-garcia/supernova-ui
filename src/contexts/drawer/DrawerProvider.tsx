import { createContext } from 'react';

import { DrawerContextProps } from './types';

const initialState: DrawerContextProps = {
  closeOnOverlayClick: true,
  finalFocusRef: null,
  getDrawerBodyProps: () => {},
  getDrawerHeaderProps: () => {},
  getDrawerFooterProps: () => {},
  id: '',
  initialFocusRef: null,
  isOpen: false,
  onClose: () => {},
  trapFocus: true,
};

export const DrawerContext = createContext<DrawerContextProps>(initialState);
export const DrawerProvider = DrawerContext.Provider;
