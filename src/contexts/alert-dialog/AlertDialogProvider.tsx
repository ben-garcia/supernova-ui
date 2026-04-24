import { createContext } from 'react';

import { AlertDialogContextProps } from './types';

const initialState: AlertDialogContextProps = {
  getAlertDialogBodyProps: (props = {}) => ({ ...props }),
  getAlertDialogFooterProps: (props = {}) => ({ ...props }),
  getAlertDialogHeaderProps: (props = {}) => ({ ...props }),
  isOpen: false,
  onClose: () => {},
};

export const AlertDialogContext =
  createContext<AlertDialogContextProps>(initialState);
export const AlertDialogProvider = AlertDialogContext.Provider;
