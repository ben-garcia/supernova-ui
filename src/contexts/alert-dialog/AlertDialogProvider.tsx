import { createContext } from 'react';

import { AlertDialogContextProps } from './types';

const initialState: AlertDialogContextProps = {
  closeOnOverlayClick: true,
  finalFocusRef: null,
  getAlertDialogBodyProps: () => {},
  getAlertDialogHeaderProps: () => {},
  getAlertDialogFooterProps: () => {},
  id: '',
  leastDestructiveRef: null,
  isOpen: false,
  onClose: () => {},
  trapFocus: true,
};

export const AlertDialogContext = createContext<AlertDialogContextProps>(
  initialState
);
export const AlertDialogProvider = AlertDialogContext.Provider;
