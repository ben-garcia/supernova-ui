import { ReactNode, RefObject } from 'react';

export interface ModalContextProps {
  closeOnOverlayClick?: boolean;
  finalFocusRef?: RefObject<HTMLElement> | null;
  initialFocusRef?: RefObject<HTMLElement> | null;
  trapFocus?: boolean;
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: ModalContextProps;
}
