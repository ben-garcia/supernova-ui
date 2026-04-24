import { HTMLAttributes, ReactNode, MutableRefObject } from 'react';

import { DialogLikeProps } from '@types';

export interface ModalContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getModalBodyProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getModalHeaderProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getModalFooterProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  id?: string;
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
  isExiting?: boolean;
  isOpen: boolean;
  leaveExitMode?: () => void;
  onClickOutside?: () => void;
  onClose: () => void;
  onEscPress?: () => void;
  size?: DialogLikeProps['size'];
  trapFocus?: boolean;
}

export interface ModalProviderProps {
  children: ReactNode;
  value: ModalContextProps;
}
