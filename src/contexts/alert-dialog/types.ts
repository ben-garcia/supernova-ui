import { HTMLAttributes, ReactNode, MutableRefObject } from 'react';

import { DialogLikeProps } from '@types';

export interface AlertDialogContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getAlertDialogBodyProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getAlertDialogFooterProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getAlertDialogHeaderProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
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
