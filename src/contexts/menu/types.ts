import { ReactNode, MutableRefObject, RefObject } from 'react';

export interface Menu {
  closeOnEsc?: boolean;
  focusedIndex: number;
  getMenuButtonProps: (
    props?: any,
    ref?: any
  ) => { ref: (value: HTMLButtonElement) => void };
  getMenuItemProps: (props?: any, ref?: any) => any;
  getMenuListProps: (props?: any, ref?: any) => any;
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
