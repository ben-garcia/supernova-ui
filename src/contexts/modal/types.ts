import { ReactNode, RefObject } from 'react';

export interface ModalContextProps {
  closeOnOverlayClick?: boolean;
  finalFocusRef?: RefObject<HTMLElement> | null;
  getModalBodyProps: () => void;
  getModalHeaderProps: () => void;
  getModalFooterProps: () => void;
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
