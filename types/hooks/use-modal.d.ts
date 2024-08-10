/// <reference types="react" />
import { ModalProps } from '@components/Modal/Modal';
/**
 * React hook that returns the Modal props.
 */
declare const useModalProvider: (props: ModalProps) => {
    closeOnEsc: boolean | undefined;
    closeOnOverlayClick: boolean | undefined;
    finalFocusRef: import("react").MutableRefObject<HTMLElement | null> | undefined;
    getModalBodyProps: (modalBodyProps?: any) => any;
    getModalHeaderProps: (modalHeaderProps?: any) => any;
    getModalFooterProps: (modalFooterProps?: any) => any;
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
 * Hooks that returns Modal context.
 */
declare const useModal: () => import("@contexts").ModalContextProps;
export { useModal, useModalProvider };
//# sourceMappingURL=use-modal.d.ts.map