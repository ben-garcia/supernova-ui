import { createContext } from 'react';

import { ModalContextProps } from './types';

const initialState: ModalContextProps = {
  getModalBodyProps: () => {},
  getModalHeaderProps: () => {},
  getModalFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const ModalContext = createContext<ModalContextProps>(initialState);
export const ModalProvider = ModalContext.Provider;
