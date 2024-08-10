import { createContext } from 'react';

import { ModalContextProps } from './types';

const initialState: ModalContextProps = {
  // @ts-expect-error
  getModalBodyProps: () => {},
  // @ts-expect-error
  getModalHeaderProps: () => {},
  // @ts-expect-error
  getModalFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const ModalContext = createContext<ModalContextProps>(initialState);
export const ModalProvider = ModalContext.Provider;
