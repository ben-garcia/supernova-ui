import { ReactNode, MutableRefObject } from 'react';

import { DrawerProps } from '@molecules/Drawer/Drawer';
import { DrawerBodyProps } from '@molecules/Drawer/DrawerBody';
import { DrawerFooterProps } from '@molecules/Drawer/DrawerFooter';
import { DrawerHeaderProps } from '@molecules/Drawer/DrawerHeader';

import { DialogLikeProps } from '@types';

export interface DrawerContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getDrawerBodyProps: (props: Omit<DrawerBodyProps, 'children'>) => void;
  getDrawerFooterProps: (props: Omit<DrawerFooterProps, 'children'>) => void;
  getDrawerHeaderProps: (props: Omit<DrawerHeaderProps, 'children'>) => void;
  id?: string;
  initialFocusRef?: MutableRefObject<HTMLElement | null>;
  isExiting?: boolean;
  isOpen: boolean;
  leaveExitMode?: () => void;
  onClickOutside?: () => void;
  onClose: () => void;
  onEscPress?: () => void;
  placement?: DrawerProps['placement'];
  size?: DialogLikeProps['size'];
  trapFocus?: boolean;
}

export interface DrawerProviderProps {
  children: ReactNode;
  value: DrawerContextProps;
}
