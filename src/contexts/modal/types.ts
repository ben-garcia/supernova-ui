import { ReactNode, RefObject } from 'react';

import { ModalBodyProps } from '../../components/molecules/Modal/ModalBody';
import { ModalFooterProps } from '../../components/molecules/Modal/ModalFooter';
import { ModalHeaderProps } from '../../components/molecules/Modal/ModalHeader';

export interface ModalContextProps {
  closeOnOverlayClick?: boolean;
  finalFocusRef?: RefObject<HTMLElement> | null;
  getModalBodyProps: (props: Omit<ModalBodyProps, 'children'>) => void;
  getModalHeaderProps: (props: Omit<ModalHeaderProps, 'children'>) => void;
  getModalFooterProps: (props: Omit<ModalFooterProps, 'children'>) => void;
  id?: string;
  initialFocusRef?: RefObject<HTMLElement> | null;
  isOpen: boolean;
  onClose: () => void;
  trapFocus?: boolean;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: ModalContextProps;
}
