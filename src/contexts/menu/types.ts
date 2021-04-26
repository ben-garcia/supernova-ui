import { ReactNode, RefObject } from 'react';

import { ButtonProps } from '../../components/atoms/Button/types';
import { MenuListProps } from '../../components/molecules/Menu/MenuList';
import { MenuItemProps } from '../../components/molecules/Menu/MenuItem';

export interface Menu {
  activeMenuItem: RefObject<HTMLButtonElement> | null;
  changeActiveMenuItem: (
    newMenuItem: RefObject<HTMLButtonElement> | null
  ) => void;
  closeOnEsc?: boolean;
  getMenuButtonProps: (
    props: ButtonProps,
    ref: RefObject<HTMLButtonElement>
  ) => void;
  getMenuItemProps: (
    props: MenuItemProps,
    ref: RefObject<HTMLButtonElement>
  ) => void;
  getMenuListProps: (
    props: Omit<MenuListProps, 'children'>,
    ref: RefObject<HTMLDivElement>
  ) => void;
  id: string;
  isOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement> | null;
  menuListRef: RefObject<HTMLDivElement> | null;
  onClose: () => void;
}

export interface MenuProviderProps {
  children: ReactNode;
  value: Menu;
}
