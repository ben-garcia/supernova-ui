import { HTMLAttributes, ReactNode, MutableRefObject } from 'react';

import { DrawerRootProps } from '@components/Drawer/DrawerRoot';
import { DialogLikeProps } from '@types';

export interface DrawerContextProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  enterExitMode?: () => void;
  finalFocusRef?: MutableRefObject<HTMLElement | null>;
  getDrawerBodyProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getDrawerFooterProps: (
    props?: HTMLAttributes<HTMLElement>
  ) => HTMLAttributes<HTMLElement>;
  getDrawerHeaderProps: (
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
  placement?: DrawerRootProps['placement'];
  size?: DialogLikeProps['size'];
  trapFocus?: boolean;
}

export interface DrawerProviderProps {
  children: ReactNode;
  value: DrawerContextProps;
}
