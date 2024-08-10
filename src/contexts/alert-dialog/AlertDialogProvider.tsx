import { createContext } from 'react';

import { AlertDialogContextProps } from './types';

const initialState: AlertDialogContextProps = {
  // @ts-expect-error
  getAlertDialogBodyProps: () => {},
  // @ts-expect-error
  getAlertDialogFooterProps: () => {},
  // @ts-expect-error
  getAlertDialogHeaderProps: () => {},
  isOpen: false,
  onClose: () => {},
};

export const AlertDialogContext =
  createContext<AlertDialogContextProps>(initialState);
export const AlertDialogProvider = AlertDialogContext.Provider;
