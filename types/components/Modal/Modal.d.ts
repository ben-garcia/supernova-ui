import { FC, MutableRefObject } from 'react';
import { DialogLikeProps } from '@types';
export interface ModalProps extends DialogLikeProps {
    /**
     * The reference element to receive focus when the Modal first opens
     */
    initialFocusRef?: MutableRefObject<HTMLElement | null>;
}
/**
 * The container for all Modal related components
 * that provides context to its children.
 */
declare const Modal: FC<ModalProps>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map