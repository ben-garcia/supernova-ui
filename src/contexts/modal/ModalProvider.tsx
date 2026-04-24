import { createContext } from 'react';

import { ModalContextProps } from './types';

const initialState: ModalContextProps = {
  getModalBodyProps: (props = {}) => ({ ...props }),
  getModalHeaderProps: (props = {}) => ({ ...props }),
  getModalFooterProps: (props = {}) => ({ ...props }),
  isOpen: false,
  onClose: () => {},
};

export const ModalContext = createContext<ModalContextProps>(initialState);
export const ModalProvider = ModalContext.Provider;
