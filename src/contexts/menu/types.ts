import { ReactNode, RefObject } from 'react';

import { ButtonProps } from '../../components/atoms/Button/types';
import { MenuListProps } from '../../components/molecules/Menu/MenuList';
import { MenuItemProps } from '../../components/molecules/Menu/MenuItem';

export interface Menu {
  closeOnEsc?: boolean;
  focusedIndex: number;
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
  isOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement> | null;
  menuId: string;
  menuListRef: RefObject<HTMLDivElement> | null;
  onClose: () => void;
  setFocusedIndex: (newIndex: number) => void;
}

export interface MenuList {
  menuButtonItemsRef: RefObject<HTMLButtonElement[]> | null;
  menuItemsContent: { [k: string]: number[] };
}

export interface MenuProviderProps {
  children: ReactNode;
  value: Menu;
}

export interface MenuListProviderProps {
  children: ReactNode;
  value: MenuList;
}
