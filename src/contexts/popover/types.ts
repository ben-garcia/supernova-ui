import { FC, ReactNode, MutableRefObject, RefObject } from 'react';

import { ButtonProps } from '@components/Button/types';
import { PopoverBodyProps } from '@components/Popover/PopoverBody';
import { PopoverFooterProps } from '@components/Popover/PopoverFooter';
import { PopoverHeaderProps } from '@components/Popover/PopoverHeader';

export interface PopoverContextProps {
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getPopoverBodyProps: (props: Omit<PopoverBodyProps, 'children'>) =>
    FC<Omit<PopoverBodyProps, 'children'>>;
  getPopoverButtonProps: (
    props: ButtonProps,
    ref: RefObject<HTMLButtonElement>
  ) => void;
  getPopoverFooterProps: (props: Omit<PopoverFooterProps, 'children'>) =>
    FC<Omit<PopoverFooterProps, 'children'>>;
  getPopoverHeaderProps: (props: Omit<PopoverHeaderProps, 'children'>) =>
    FC<Omit<PopoverHeaderProps, 'children'>>;
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
