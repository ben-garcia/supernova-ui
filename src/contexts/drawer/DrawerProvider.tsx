import { createContext } from 'react';

import { DrawerContextProps } from './types';

const initialState: DrawerContextProps = {
  // @ts-expect-error
  getDrawerBodyProps: () => {},
  // @ts-expect-error
  getDrawerHeaderProps: () => {},
  // @ts-expect-error
  getDrawerFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const DrawerContext = createContext<DrawerContextProps>(initialState);
export const DrawerProvider = DrawerContext.Provider;
