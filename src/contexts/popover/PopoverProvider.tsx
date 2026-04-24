import { createContext } from 'react';

import { PopoverContextProps } from './types';

const initialState: PopoverContextProps = {
  getPopoverBodyProps: (props = {}) => ({ ...props }),
  getPopoverButtonProps: (props = {}) => ({ ...props }),
  getPopoverHeaderProps: (props = {}) => ({ ...props }),
  getPopoverFooterProps: (props = {}) => ({ ...props }),
  isOpen: false,
  onClose: () => {},
  popoverButtonRef: null,
};

export const PopoverContext = createContext<PopoverContextProps>(initialState);
export const PopoverProvider = PopoverContext.Provider;
