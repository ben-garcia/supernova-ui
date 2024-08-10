/// <reference types="react" />
import { AlertDialogProps } from '@components/AlertDialog/AlertDialog';
/** Hooks that returns the AlertDialog props
 */
export declare const useAlertDialogProvider: (props: AlertDialogProps) => {
    closeOnEsc: boolean | undefined;
    closeOnOverlayClick: boolean | undefined;
    finalFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    getAlertDialogBodyProps: (alertDialogBodyProps?: any) => any;
    getAlertDialogHeaderProps: (alertDialogHeaderProps?: any) => any;
    getAlertDialogFooterProps: (alertDialogFooterProps?: any) => any;
    id: string;
    isOpen: boolean;
    leastDestructiveRef: import("react").MutableRefObject<HTMLElement | null>;
    onClickOutside: (() => void) | undefined;
    onClose: () => void;
    onEscPress: (() => void) | undefined;
    size: import("../types").ComponentSize | "xl" | "xxl" | undefined;
    trapFocus: boolean | undefined;
};
/**
 * Hooks that returns all AlertDialog props
 */
export declare const useAlertDialog: () => import("@contexts").AlertDialogContextProps;
//# sourceMappingURL=use-alert-dialog.d.ts.map