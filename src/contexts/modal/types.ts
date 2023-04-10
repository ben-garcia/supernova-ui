import { ReactNode, MutableRefObject } from 'react';

import { ModalBodyProps } from '@components/Modal/ModalBody';
import { ModalFooterProps } from '@components/Modal/ModalFooter';
import { ModalHeaderProps } from '@components/Modal/ModalHeader';
import { DialogLikeProps } from '@types';

export interface ModalContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getModalBodyProps: (props: Omit<ModalBodyProps, 'children'>) => void;
  getModalHeaderProps: (props: Omit<ModalHeaderProps, 'children'>) => void;
  getModalFooterProps: (props: Omit<ModalFooterProps, 'children'>) => void;
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
