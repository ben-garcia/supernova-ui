import { createContext } from 'react';

import { ModalContextProps } from './types';

const initialState: ModalContextProps = {
  trapFocus: true,
  finalFocusRef: null,
  initialFocusRef: null,
  closeOnOverlayClick: true,
  id: '',
  isOpen: false,
  onClose: () => {},
};

export const ModalContext = createContext<ModalContextProps>(initialState);
export const ModalProvider = ModalContext.Provider;
