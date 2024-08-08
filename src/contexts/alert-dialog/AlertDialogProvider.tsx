import { createContext } from 'react';

import { AlertDialogContextProps } from './types';

const initialState: AlertDialogContextProps = {
  getAlertDialogBodyProps: () => {},
  getAlertDialogHeaderProps: () => {},
  getAlertDialogFooterProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const AlertDialogContext =
  createContext<AlertDialogContextProps>(initialState);
export const AlertDialogProvider = AlertDialogContext.Provider;
