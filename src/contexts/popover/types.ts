import { HTMLAttributes, ReactNode, MutableRefObject } from 'react';

export interface PopoverContextProps {
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getPopoverBodyProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getPopoverButtonProps: (
    // props: ButtonProps,
    // ref: RefObject<HTMLButtonElement>
    props: any,
    ref: any
  ) => any;
  getPopoverFooterProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getPopoverHeaderProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  id?: string;
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
  isOpen: boolean;
  onBlur?: () => void;
  onClose: () => void;
  onEscPress?: () => void;
  onToggle?: () => void;
  popoverButtonRef: MutableRefObject<HTMLButtonElement | null> | null;
  trapFocus?: boolean;
  shouldReturnFocusOnClose?: boolean;
}

export interface PopoverProviderProps {
  children: ReactNode;
  value: PopoverContextProps;
}
