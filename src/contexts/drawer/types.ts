import { ReactNode, RefObject } from 'react';

import { DrawerBodyProps } from '../../components/molecules/Drawer/DrawerBody';
import { DrawerFooterProps } from '../../components/molecules/Drawer/DrawerFooter';
import { DrawerHeaderProps } from '../../components/molecules/Drawer/DrawerHeader';

export interface DrawerContextProps {
  closeOnOverlayClick?: boolean;
  finalFocusRef?: RefObject<HTMLElement> | null;
  getDrawerBodyProps: (props: Omit<DrawerBodyProps, 'children'>) => void;
  getDrawerFooterProps: (props: Omit<DrawerFooterProps, 'children'>) => void;
  getDrawerHeaderProps: (props: Omit<DrawerHeaderProps, 'children'>) => void;
  id?: string;
  initialFocusRef?: RefObject<HTMLElement> | null;
  isOpen: boolean;
  onClose: () => void;
  trapFocus?: boolean;
}

export interface DrawerProviderProps {
  children: ReactNode;
  value: DrawerContextProps;
}
