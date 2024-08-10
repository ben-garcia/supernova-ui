import React from 'react';
import { MenuProps } from '@components/Menu/types';
/**
 * Hooks that returns the Menu props
 */
export declare const useMenuProvider: (props: MenuProps) => {
    closeOnEsc: boolean | undefined;
    getMenuButtonProps: (menuButtonProps?: any, forwardedRef?: any) => any;
    getMenuItemProps: (menuItemProps?: any, forwardedRef?: any) => any;
    getMenuListProps: (menuListProps?: any, forwardedRef?: any) => any;
    isOpen: boolean;
    menuButtonRef: React.RefObject<HTMLButtonElement>;
    menuListRef: React.RefObject<HTMLDivElement>;
    onClose: () => void;
};
/**
 * Hooks that returns all menu props
 */
export declare const useMenu: () => import("@contexts").Menu;
/**
 * Hooks that returns all menu list props
 */
export declare const useMenuList: () => import("@contexts").MenuList;
//# sourceMappingURL=use-menu.d.ts.map