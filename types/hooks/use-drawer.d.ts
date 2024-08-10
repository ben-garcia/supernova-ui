/// <reference types="react" />
import { DrawerProps } from '@components/Drawer/Drawer';
/** Hooks that returns the Drawer props
 */
declare const useDrawerProvider: (props: DrawerProps) => {
    closeOnEsc: boolean | undefined;
    closeOnOverlayClick: boolean | undefined;
    finalFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    getDrawerBodyProps: (drawerBodyProps?: any) => any;
    getDrawerHeaderProps: (drawerHeaderProps?: any) => any;
    getDrawerFooterProps: (drawerFooterProps?: any) => any;
    id: string;
    initialFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    isOpen: boolean;
    onClickOutside: (() => void) | undefined;
    onClose: () => void;
    onEscPress: (() => void) | undefined;
    size: import("../types").ComponentSize | "xl" | "xxl" | undefined;
    trapFocus: boolean | undefined;
};
/**
 * Hooks that returns all Drawer props
 */
declare const useDrawer: () => import("@contexts").DrawerContextProps;
export { useDrawer, useDrawerProvider };
//# sourceMappingURL=use-drawer.d.ts.map