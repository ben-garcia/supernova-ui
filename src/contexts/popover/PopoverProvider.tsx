import { createContext } from 'react';

import { PopoverContextProps } from './types';

const initialState: PopoverContextProps = {
  getPopoverBodyProps: () => {},
  getPopoverButtonProps: () => {},
  getPopoverHeaderProps: () => {},
  getPopoverFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
  popoverButtonRef: null,
};

export const PopoverContext = createContext<PopoverContextProps>(initialState);
export const PopoverProvider = PopoverContext.Provider;
