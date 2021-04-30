import { createContext } from 'react';

import { ModalContextProps } from './types';

const initialState: ModalContextProps = {
  closeOnOverlayClick: true,
  finalFocusRef: null,
  getModalBodyProps: () => {},
  getModalHeaderProps: () => {},
  getModalFooterProps: () => {},
  id: '',
  initialFocusRef: null,
  isOpen: false,
  onClose: () => {},
  trapFocus: true,
};

export const ModalContext = createContext<ModalContextProps>(initialState);
export const ModalProvider = ModalContext.Provider;
