import { FC, ReactNode, MutableRefObject, RefObject } from 'react';

import { ButtonProps } from '@components/Button/types';
import { MenuListProps } from '@components/Menu/MenuList';
import { MenuItemProps } from '@components/Menu/MenuItem';

export interface Menu {
  closeOnEsc?: boolean;
  focusedIndex: number;
  getMenuButtonProps: (
    props: ButtonProps,
    ref: RefObject<HTMLButtonElement>
    ) => FC<Omit<ButtonProps, 'children'>>;
  getMenuItemProps: (
    props: MenuItemProps,
    ref: RefObject<HTMLButtonElement>
    ) => FC<Omit<MenuItemProps, 'children'>>;
  getMenuListProps: (
    props: Omit<MenuListProps, 'children'>,
    ref: RefObject<HTMLDivElement>
  ) => FC<Omit<MenuListProps, 'children'>>;
  isOpen: boolean;
  menuButtonRef: MutableRefObject<HTMLButtonElement | null> | null;
  menuId: string;
  menuListRef: MutableRefObject<HTMLDivElement | null> | null;
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
