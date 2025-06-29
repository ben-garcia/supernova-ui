import { FC, ReactNode, MutableRefObject } from 'react';

import { AlertDialogBodyProps } from '@components/AlertDialog/AlertDialogBody';
import { AlertDialogFooterProps } from '@components/AlertDialog/AlertDialogFooter';
import { AlertDialogHeaderProps } from '@components/AlertDialog/AlertDialogHeader';
import { DialogLikeProps } from '@types';

export interface AlertDialogContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getAlertDialogBodyProps: (
    props: Omit<AlertDialogBodyProps, 'children'>
  ) => FC<Omit<AlertDialogBodyProps, 'children'>>;
  getAlertDialogFooterProps: (
    props: Omit<AlertDialogFooterProps, 'children'>
  ) => FC<Omit<AlertDialogFooterProps, 'children'>>;
  getAlertDialogHeaderProps: (
    props: Omit<AlertDialogHeaderProps, 'children'>
  ) => FC<Omit<AlertDialogHeaderProps, 'children'>>;
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

export interface AlertDialogProviderProps {
  children: ReactNode;
  value: AlertDialogContextProps;
}
