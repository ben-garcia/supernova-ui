import { ReactNode, RefObject } from 'react';

import { AlertDialogBodyProps } from '../../components/molecules/AlertDialog/AlertDialogBody';
import { AlertDialogFooterProps } from '../../components/molecules/AlertDialog/AlertDialogFooter';
import { AlertDialogHeaderProps } from '../../components/molecules/AlertDialog/AlertDialogHeader';

export interface AlertDialogContextProps {
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: RefObject<HTMLElement> | null;
  getAlertDialogBodyProps: (
    props: Omit<AlertDialogBodyProps, 'children'>
  ) => void;
  getAlertDialogFooterProps: (
    props: Omit<AlertDialogFooterProps, 'children'>
  ) => void;
  getAlertDialogHeaderProps: (
    props: Omit<AlertDialogHeaderProps, 'children'>
  ) => void;
  id?: string;
  isOpen: boolean;
  leastDestructiveRef?: RefObject<HTMLElement> | null;
  leaveExitMode?: () => void;
  onClose: () => void;
  trapFocus?: boolean;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: AlertDialogContextProps;
}
