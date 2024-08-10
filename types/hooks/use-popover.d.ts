/// <reference types="react" />
import { PopoverProps } from '@components/Popover/Popover';
/**
 * React hook that returns the Popover props.
 */
declare const usePopoverProvider: (props: PopoverProps) => {
    closeOnEsc: boolean | undefined;
    closeOnBlur: boolean | undefined;
    finalFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    getPopoverBodyProps: (popoverBodyProps?: any) => any;
    getPopoverButtonProps: (popoverButtonProps?: any, forwardedRef?: any) => any;
    getPopoverHeaderProps: (popoverHeaderProps?: any) => any;
    getPopoverFooterProps: (popoverFooterProps?: any) => any;
    id: string;
    initialFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    isOpen: boolean;
    onBlur: (() => void) | undefined;
    onClose: () => void;
    onEscPress: (() => void) | undefined;
    onToggle: (() => void) | undefined;
    popoverButtonRef: import("react").MutableRefObject<HTMLButtonElement | null>;
    trapFocus: boolean | undefined;
    shouldReturnFocusOnClose: boolean | undefined;
};
/**
 * React Hook that returns Propover  context.
 */
declare const usePopover: () => import("@contexts").PopoverContextProps;
export { usePopover, usePopoverProvider };
//# sourceMappingURL=use-popover.d.ts.map