import { createContext } from 'react';

import { PopoverContextProps } from './types';

const initialState: PopoverContextProps = {
  // @ts-expect-error
  getPopoverBodyProps: () => {},
  getPopoverButtonProps: () => {},
  // @ts-expect-error
  getPopoverHeaderProps: () => {},
  // @ts-expect-error
  getPopoverFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
  popoverButtonRef: null,
};

export const PopoverContext = createContext<PopoverContextProps>(initialState);
export const PopoverProvider = PopoverContext.Provider;
