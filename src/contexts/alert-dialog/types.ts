import { ReactNode, MutableRefObject } from 'react';

import { AlertDialogBodyProps } from '@molecules/AlertDialog/AlertDialogBody';
import { AlertDialogFooterProps } from '@molecules/AlertDialog/AlertDialogFooter';
import { AlertDialogHeaderProps } from '@molecules/AlertDialog/AlertDialogHeader';

import { DialogLikeProps } from '@types';

export interface AlertDialogContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
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
  isExiting?: boolean;
  isOpen: boolean;
  leastDestructiveRef?: MutableRefObject<HTMLElement | null>;
  leaveExitMode?: () => void;
  onClickOutside?: () => void;
  onClose: () => void;
  onEscPress?: () => void;
  size?: DialogLikeProps['size'];
  trapFocus?: boolean;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: AlertDialogContextProps;
}
